import { Worker, Job } from "bullmq";
import { connection, QUEUE_NAMES, AssessmentJobData } from "@/lib/queue";
import { prisma } from "@/lib/prisma";
import { runVisionAgent, marksheetToText } from "@/agents/visionAgent";
import { runParserAgent, profileToEmbeddingText } from "@/agents/parserAgent";
import { runCareerDNAAgent } from "@/agents/careerDNAAgent";
import { generateEmbedding } from "@/lib/openai";
import { recommendationQueue } from "@/lib/queue";

async function processAssessment(job: Job<AssessmentJobData>) {
  const { studentId, userId, answers, voiceTranscript, marksheetBase64 } = job.data;

  console.log(`[AssessmentWorker] Processing job ${job.id} for student ${studentId}`);

  await job.updateProgress(10);

  // Step 1: OCR marksheet if provided
  let marksheetData = "";
  if (marksheetBase64) {
    try {
      console.log(`[AssessmentWorker] Running Vision Agent for OCR...`);
      const marksheet = await runVisionAgent(marksheetBase64);
      marksheetData = marksheetToText(marksheet);
      console.log(`[AssessmentWorker] OCR complete`);
    } catch (err) {
      console.warn(`[AssessmentWorker] OCR failed:`, err);
    }
  }

  await job.updateProgress(30);

  // Step 2: Parse answers and voice transcript
  const rawText = [JSON.stringify(answers), voiceTranscript || "", marksheetData].join("\n");
  const parsedProfile = await runParserAgent(rawText, voiceTranscript ? "voice" : "assessment");
  const profileText = profileToEmbeddingText(parsedProfile);

  await job.updateProgress(50);

  // Step 3: Generate embedding
  const embedding = await generateEmbedding(profileText);

  await job.updateProgress(70);

  // Step 4: Run CareerDNA Agent
  const student = await prisma.student.findUnique({ where: { id: studentId } });
  const { vectorId, matches } = await runCareerDNAAgent({
    studentId,
    answers,
    voiceTranscript,
    stream: student?.stream || undefined,
    class: student?.class || undefined,
    city: student?.city || undefined,
    marksheetData,
  });

  await job.updateProgress(85);

  // Step 5: Update student record
  await prisma.student.update({
    where: { id: studentId },
    data: {
      careerDnaId: vectorId,
      careerMatches: matches as unknown as Record<string, unknown>[],
      progress: 30,
    },
  });

  await job.updateProgress(90);

  // Step 6: Queue recommendation generation
  await recommendationQueue.add(
    "generate-recommendations",
    {
      studentId,
      userId,
      embedding,
      answers,
    },
    { priority: 1 }
  );

  await job.updateProgress(100);
  console.log(`[AssessmentWorker] Job ${job.id} complete`);

  return { studentId, vectorId, matchCount: matches.length };
}

export function startAssessmentWorker() {
  const worker = new Worker<AssessmentJobData>(
    QUEUE_NAMES.ASSESSMENT,
    processAssessment,
    {
      connection,
      concurrency: 5,
    }
  );

  worker.on("completed", (job) => {
    console.log(`[AssessmentWorker] Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[AssessmentWorker] Job ${job?.id} failed:`, err);
  });

  worker.on("progress", (job, progress) => {
    console.log(`[AssessmentWorker] Job ${job.id} progress: ${progress}%`);
  });

  console.log("[AssessmentWorker] Worker started");
  return worker;
}
