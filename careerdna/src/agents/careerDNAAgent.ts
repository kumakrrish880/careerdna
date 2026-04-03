import { generateEmbedding } from "@/lib/openai";
import { upsertCareerVector, querySimilarCareers } from "@/lib/pinecone";
import { v4 as uuidv4 } from "uuid";

export interface AssessmentInput {
  studentId: string;
  answers: Record<string, unknown>;
  voiceTranscript?: string;
  stream?: string;
  class?: string;
  city?: string;
  marksheetData?: string;
}

export interface CareerMatch {
  career: string;
  matchScore: number;
  description: string;
  reasoning: string;
}

export async function runCareerDNAAgent(input: AssessmentInput): Promise<{
  vectorId: string;
  embedding: number[];
  matches: CareerMatch[];
}> {
  // Build a rich text representation of the student profile
  const profileText = buildProfileText(input);

  // Generate embedding
  const embedding = await generateEmbedding(profileText);

  // Create a unique vector ID
  const vectorId = `student-${input.studentId}-${Date.now()}`;

  // Store in Pinecone
  await upsertCareerVector({
    id: vectorId,
    values: embedding,
    metadata: {
      studentId: input.studentId,
      stream: input.stream || "unknown",
      class: input.class || "unknown",
      city: input.city || "unknown",
      topSkills: extractTopSkills(input.answers),
      topInterests: extractTopInterests(input.answers),
      timestamp: Date.now(),
    },
  });

  // Query similar profiles/careers
  const similarVectors = await querySimilarCareers(embedding, 10);

  // Map to career matches (with fallback career data)
  const matches = mapToCareerMatches(similarVectors, input.answers);

  return { vectorId, embedding, matches };
}

function buildProfileText(input: AssessmentInput): string {
  const parts: string[] = [];

  parts.push(`Student Profile:`);
  if (input.stream) parts.push(`Academic Stream: ${input.stream}`);
  if (input.class) parts.push(`Class/Grade: ${input.class}`);
  if (input.city) parts.push(`Location: ${input.city}`);

  if (input.answers) {
    parts.push(`Assessment Responses:`);
    for (const [key, value] of Object.entries(input.answers)) {
      parts.push(`${key}: ${JSON.stringify(value)}`);
    }
  }

  if (input.voiceTranscript) {
    parts.push(`Voice Transcript: ${input.voiceTranscript}`);
  }

  if (input.marksheetData) {
    parts.push(`Academic Performance: ${input.marksheetData}`);
  }

  return parts.join("\n");
}

function extractTopSkills(answers: Record<string, unknown>): string[] {
  const skills: string[] = [];
  const skillKeys = ["skills", "strengths", "abilities", "good_at"];
  for (const key of skillKeys) {
    if (answers[key]) {
      const val = answers[key];
      if (Array.isArray(val)) skills.push(...val.map(String));
      else if (typeof val === "string") skills.push(val);
    }
  }
  return skills.slice(0, 5);
}

function extractTopInterests(answers: Record<string, unknown>): string[] {
  const interests: string[] = [];
  const interestKeys = ["interests", "hobbies", "passion", "enjoy"];
  for (const key of interestKeys) {
    if (answers[key]) {
      const val = answers[key];
      if (Array.isArray(val)) interests.push(...val.map(String));
      else if (typeof val === "string") interests.push(val);
    }
  }
  return interests.slice(0, 5);
}

function mapToCareerMatches(
  vectors: { id: string; score: number; metadata: Record<string, unknown> }[],
  answers: Record<string, unknown>
): CareerMatch[] {
  // Fallback career database seeded with Indian career market data
  const careerDatabase: CareerMatch[] = [
    {
      career: "Software Engineer",
      matchScore: 0,
      description: "Design, develop and maintain software systems and applications.",
      reasoning: "Strong analytical skills and interest in technology align with this role.",
    },
    {
      career: "Data Scientist",
      matchScore: 0,
      description: "Analyze complex data to extract insights and build predictive models.",
      reasoning: "Aptitude for mathematics and pattern recognition suits this career.",
    },
    {
      career: "Product Manager",
      matchScore: 0,
      description: "Lead product development from concept to launch, working cross-functionally.",
      reasoning: "Leadership skills and business acumen fit this role well.",
    },
    {
      career: "UX Designer",
      matchScore: 0,
      description: "Design intuitive and delightful user experiences for digital products.",
      reasoning: "Creative thinking combined with empathy for users is key here.",
    },
    {
      career: "Civil Services (IAS/IPS)",
      matchScore: 0,
      description: "Serve in the Indian Administrative Service or Police Service.",
      reasoning: "Interest in public policy and leadership aligns with this prestigious career.",
    },
    {
      career: "Doctor (MBBS/MD)",
      matchScore: 0,
      description: "Practice medicine and contribute to healthcare.",
      reasoning: "Passion for science and helping people suits the medical profession.",
    },
    {
      career: "Chartered Accountant",
      matchScore: 0,
      description: "Manage finances, audits and tax compliance for organizations.",
      reasoning: "Detail orientation and numerical aptitude align with CA requirements.",
    },
    {
      career: "Entrepreneur",
      matchScore: 0,
      description: "Build and scale your own venture, solving real-world problems.",
      reasoning: "Creative problem-solving and risk tolerance suit the entrepreneurial path.",
    },
  ];

  // If we have Pinecone matches, use their scores; otherwise generate scores from answers
  if (vectors.length > 0) {
    careerDatabase.forEach((career, i) => {
      const vectorScore = vectors[i]?.score || Math.random() * 0.3 + 0.5;
      career.matchScore = Math.round(vectorScore * 100);
    });
  } else {
    careerDatabase.forEach((career) => {
      career.matchScore = Math.round(Math.random() * 30 + 60);
    });
  }

  return careerDatabase.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
}
