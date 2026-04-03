import { generateCompletion } from "@/lib/openai";
import { ScoredCareer } from "./scorerAgent";

export interface PersonalizedFeedback {
  career: string;
  whyItFits: string;
  yourAdvantages: string[];
  nextSteps: string[];
  challengesToWatch: string[];
  inspirationalNote: string;
}

export interface CareerReport {
  summary: string;
  topCareer: PersonalizedFeedback;
  otherCareers: PersonalizedFeedback[];
  overallGuidance: string;
  urgentActions: string[];
}

export async function runFeedbackAgent(
  careers: ScoredCareer[],
  studentProfile: {
    name?: string;
    class?: string;
    stream?: string;
    city?: string;
    answers: Record<string, unknown>;
    voiceTranscript?: string;
  }
): Promise<CareerReport> {
  const topCareers = careers.slice(0, 3);
  const studentLevel = getStudentLevel(studentProfile.class);

  const systemPrompt = `You are CareerDNA's empathetic AI career counselor for Indian students.
Write in ${studentLevel} language — warm, encouraging, and culturally aware.
You understand Indian education system (CBSE/ICSE/State boards, IIT/JEE, NEET, UPSC).
Always be positive but honest. Mention specific actionable steps.
Return ONLY valid JSON, no other text.`;

  const userPrompt = `Create a personalized career feedback report for:
Name: ${studentProfile.name || "Student"}
Class: ${studentProfile.class || "Unknown"}
Stream: ${studentProfile.stream || "Unknown"}
City: ${studentProfile.city || "India"}

Their assessment suggests these top career matches:
${topCareers
  .map(
    (c) =>
      `${c.rank}. ${c.career} - Score: ${c.finalScore}/100, Market Demand: ${c.marketDemand}, Avg Salary: ${c.avgSalary}`
  )
  .join("\n")}

Student's key responses: ${JSON.stringify(studentProfile.answers).slice(0, 500)}
${studentProfile.voiceTranscript ? `Voice input: ${studentProfile.voiceTranscript.slice(0, 300)}` : ""}

Return this JSON:
{
  "summary": "2-3 sentence personalized summary of their profile",
  "topCareer": {
    "career": "career name",
    "whyItFits": "2-3 sentences explaining why this is perfect for them specifically",
    "yourAdvantages": ["advantage specific to their profile", "advantage 2"],
    "nextSteps": ["concrete step 1 for their class level", "step 2", "step 3"],
    "challengesToWatch": ["realistic challenge 1", "challenge 2"],
    "inspirationalNote": "1 motivating sentence"
  },
  "otherCareers": [
    {
      "career": "career name",
      "whyItFits": "brief explanation",
      "yourAdvantages": ["advantage"],
      "nextSteps": ["step 1", "step 2"],
      "challengesToWatch": ["challenge"],
      "inspirationalNote": "motivating sentence"
    }
  ],
  "overallGuidance": "2-3 paragraphs of comprehensive career guidance",
  "urgentActions": ["most important action to take now", "second action", "third action"]
}`;

  try {
    const result = await generateCompletion(systemPrompt, userPrompt, 2000);
    const clean = result.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(clean) as CareerReport;
  } catch (error) {
    console.error("Feedback agent error:", error);
    // Return a minimal fallback report
    const top = topCareers[0];
    return {
      summary: `Based on your assessment, you show strong aptitude for careers in ${topCareers
        .slice(0, 2)
        .map((c) => c.career)
        .join(" and ")}.`,
      topCareer: {
        career: top?.career || "Software Engineering",
        whyItFits: `Your skills and interests align well with ${top?.career || "this field"}.`,
        yourAdvantages: ["Strong analytical ability", "Good problem solving skills"],
        nextSteps: [
          "Research the field thoroughly",
          "Talk to professionals in this area",
          "Take relevant online courses",
        ],
        challengesToWatch: ["Competition is high", "Continuous learning required"],
        inspirationalNote: "Your journey of a thousand miles begins with a single step!",
      },
      otherCareers: [],
      overallGuidance:
        "Focus on building strong fundamentals in your chosen field. Stay curious and keep learning.",
      urgentActions: [
        "Complete your current academic year with focus",
        "Research top colleges for your chosen career",
        "Start preparing for relevant entrance exams",
      ],
    };
  }
}

function getStudentLevel(classStr?: string): string {
  const classNum = parseInt(classStr || "10");
  if (classNum <= 8) return "simple, friendly 8th-grade";
  if (classNum <= 10) return "clear, motivating 10th-grade";
  if (classNum <= 12) return "detailed, professional 12th-grade";
  return "college-level";
}
