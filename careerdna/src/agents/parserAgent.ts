import { generateCompletion } from "@/lib/openai";

export interface ParsedProfile {
  skills: string[];
  interests: string[];
  strengths: string[];
  academicPerformance: string;
  personalityTraits: string[];
  careerGoals: string[];
  concerns: string[];
}

export async function runParserAgent(
  rawText: string,
  context: "voice" | "assessment" | "chat" = "assessment"
): Promise<ParsedProfile> {
  const systemPrompt = `You are an expert career counselor specializing in Indian student profiles.
Your task is to extract structured career-relevant information from ${context} input.
Return ONLY a valid JSON object, no other text.`;

  const userPrompt = `Extract the following from this student's ${context} response:
- skills (technical and soft skills mentioned or implied)
- interests (topics, activities, subjects they enjoy)
- strengths (what they excel at)
- academicPerformance (summary of academic standing)
- personalityTraits (introvert/extrovert, leadership, creativity etc.)
- careerGoals (explicit career aspirations mentioned)
- concerns (worries, constraints like location, family expectations)

Input text:
"${rawText}"

Return this JSON structure:
{
  "skills": ["skill1", "skill2"],
  "interests": ["interest1", "interest2"],
  "strengths": ["strength1"],
  "academicPerformance": "brief description",
  "personalityTraits": ["trait1", "trait2"],
  "careerGoals": ["goal1"],
  "concerns": ["concern1"]
}`;

  try {
    const result = await generateCompletion(systemPrompt, userPrompt, 800);
    const clean = result.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(clean) as ParsedProfile;
  } catch (error) {
    console.error("Parser agent error:", error);
    return {
      skills: [],
      interests: [],
      strengths: [],
      academicPerformance: "",
      personalityTraits: [],
      careerGoals: [],
      concerns: [],
    };
  }
}

export function profileToEmbeddingText(profile: ParsedProfile): string {
  return [
    `Skills: ${profile.skills.join(", ")}`,
    `Interests: ${profile.interests.join(", ")}`,
    `Strengths: ${profile.strengths.join(", ")}`,
    `Academic: ${profile.academicPerformance}`,
    `Personality: ${profile.personalityTraits.join(", ")}`,
    `Career Goals: ${profile.careerGoals.join(", ")}`,
    `Concerns: ${profile.concerns.join(", ")}`,
  ]
    .filter((line) => !line.endsWith(": "))
    .join("\n");
}
