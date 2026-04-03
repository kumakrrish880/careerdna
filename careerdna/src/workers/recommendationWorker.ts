import { Worker, Job } from "bullmq";
import { connection, QUEUE_NAMES, RecommendationJobData } from "@/lib/queue";
import { prisma } from "@/lib/prisma";
import { runScorerAgent } from "@/agents/scorerAgent";
import { runFeedbackAgent } from "@/agents/feedbackAgent";
import { runMarketAgent } from "@/agents/marketAgent";
import { querySimilarCareers } from "@/lib/pinecone";
import { setCached } from "@/lib/redis";

const COURSE_DATABASE = [
  {
    id: "course-001",
    title: "The Complete Web Development Bootcamp",
    platform: "Udemy",
    instructor: "Dr. Angela Yu",
    duration: "65 hours",
    level: "Beginner",
    rating: 4.7,
    price: "₹499",
    url: "https://udemy.com",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    careers: ["Software Engineer"],
  },
  {
    id: "course-002",
    title: "Python for Data Science and Machine Learning",
    platform: "Coursera",
    instructor: "Jose Portilla",
    duration: "25 hours",
    level: "Intermediate",
    rating: 4.6,
    price: "₹2,500/mo",
    url: "https://coursera.org",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    careers: ["Data Scientist"],
  },
  {
    id: "course-003",
    title: "Product Management Fundamentals",
    platform: "ProductSchool",
    instructor: "Carlos González",
    duration: "40 hours",
    level: "Beginner",
    rating: 4.5,
    price: "Free",
    url: "https://productschool.com",
    skills: ["Product Strategy", "Roadmapping", "User Research"],
    careers: ["Product Manager"],
  },
  {
    id: "course-004",
    title: "Google UX Design Certificate",
    platform: "Coursera",
    instructor: "Google",
    duration: "6 months",
    level: "Beginner",
    rating: 4.8,
    price: "₹2,500/mo",
    url: "https://coursera.org",
    skills: ["UX Research", "Wireframing", "Figma", "Prototyping"],
    careers: ["UX Designer"],
  },
  {
    id: "course-005",
    title: "UPSC Civil Services Preparation",
    platform: "Unacademy",
    instructor: "Roman Saini",
    duration: "500+ hours",
    level: "Advanced",
    rating: 4.7,
    price: "₹1,299/mo",
    url: "https://unacademy.com",
    skills: ["GS Paper", "Essay Writing", "Current Affairs", "Optionals"],
    careers: ["Civil Services (IAS/IPS)"],
  },
  {
    id: "course-006",
    title: "CA Foundation Complete Course",
    platform: "ICAI",
    instructor: "ICAI Faculty",
    duration: "200 hours",
    level: "Beginner",
    rating: 4.5,
    price: "₹5,000",
    url: "https://icai.org",
    skills: ["Accounting", "Business Law", "Economics"],
    careers: ["Chartered Accountant"],
  },
];

async function processRecommendation(job: Job<RecommendationJobData>) {
  const { studentId, userId, embedding, answers } = job.data;

  console.log(`[RecommendationWorker] Processing job ${job.id} for student ${studentId}`);

  await job.updateProgress(10);

  // Step 1: Get student details
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { user: { select: { name: true } } },
  });

  if (!student) throw new Error(`Student ${studentId} not found`);

  await job.updateProgress(20);

  // Step 2: Query similar vectors from Pinecone
  const similarVectors = await querySimilarCareers(embedding, 10);

  await job.updateProgress(35);

  // Step 3: Get initial career matches from student record
  const rawMatches = (student.careerMatches as unknown as {
    career: string;
    matchScore: number;
    description: string;
    reasoning: string;
  }[]) || [];

  await job.updateProgress(45);

  // Step 4: Run Scorer Agent
  const scoredCareers = runScorerAgent(rawMatches, answers);

  await job.updateProgress(60);

  // Step 5: Get market data
  const { jobs: marketJobs, insights } = await runMarketAgent();

  await job.updateProgress(70);

  // Step 6: Run Feedback Agent for personalized report
  const report = await runFeedbackAgent(scoredCareers, {
    name: student.user?.name || undefined,
    class: student.class || undefined,
    stream: student.stream || undefined,
    city: student.city || undefined,
    answers,
  });

  await job.updateProgress(85);

  // Step 7: Match courses to top careers
  const topCareerNames = scoredCareers.slice(0, 3).map((c) => c.career);
  const recommendedCourses = COURSE_DATABASE.filter((course) =>
    course.careers.some((c) => topCareerNames.includes(c))
  );

  await job.updateProgress(92);

  // Step 8: Store recommendation in DB
  const recommendation = await prisma.recommendation.create({
    data: {
      studentId,
      careers: scoredCareers as unknown as Record<string, unknown>[],
      courses: recommendedCourses as unknown as Record<string, unknown>[],
      report: JSON.stringify(report),
    },
  });

  // Step 9: Update student progress
  await prisma.student.update({
    where: { id: studentId },
    data: { progress: 50 },
  });

  // Step 10: Cache results in Redis
  await setCached(
    `recommendations:${studentId}`,
    {
      id: recommendation.id,
      careers: scoredCareers,
      courses: recommendedCourses,
      report,
    },
    7200 // 2 hour cache
  );

  await job.updateProgress(100);
  console.log(`[RecommendationWorker] Job ${job.id} complete`);

  return { studentId, recommendationId: recommendation.id };
}

export function startRecommendationWorker() {
  const worker = new Worker<RecommendationJobData>(
    QUEUE_NAMES.RECOMMENDATIONS,
    processRecommendation,
    {
      connection,
      concurrency: 3,
    }
  );

  worker.on("completed", (job) => {
    console.log(`[RecommendationWorker] Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[RecommendationWorker] Job ${job?.id} failed:`, err);
  });

  console.log("[RecommendationWorker] Worker started");
  return worker;
}
