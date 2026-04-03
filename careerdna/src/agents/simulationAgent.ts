import { generateCompletion } from "@/lib/openai";

export interface CareerSimulation {
  career: string;
  timeline: TimelineStep[];
  typicalDay: string[];
  salaryProgression: { year: number; minLPA: number; maxLPA: number }[];
  keyMilestones: string[];
  skillsNeeded: { skill: string; importance: "Critical" | "High" | "Medium" }[];
  examPathway: ExamPathway[];
}

export interface TimelineStep {
  phase: string;
  duration: string;
  activities: string[];
  outcome: string;
}

export interface ExamPathway {
  exam: string;
  when: string;
  importance: string;
  prepTime: string;
}

export async function runSimulationAgent(
  career: string,
  studentClass: string
): Promise<CareerSimulation> {
  const systemPrompt = `You are a career pathway expert for Indian students.
Generate a realistic career simulation for the Indian education and job market.
Include specific Indian exams (JEE, NEET, CAT, UPSC, GATE etc.) and colleges.
Return ONLY valid JSON, no other text.`;

  const userPrompt = `Create a detailed career simulation for a Class ${studentClass} student wanting to become a ${career} in India.

Return this JSON:
{
  "career": "${career}",
  "timeline": [
    {"phase": "phase name", "duration": "X years", "activities": ["activity1"], "outcome": "what you achieve"}
  ],
  "typicalDay": ["task at 9am", "task at 11am", "task at 2pm", "task at 4pm"],
  "salaryProgression": [
    {"year": 1, "minLPA": 6, "maxLPA": 12},
    {"year": 3, "minLPA": 12, "maxLPA": 25},
    {"year": 5, "minLPA": 20, "maxLPA": 45},
    {"year": 10, "minLPA": 40, "maxLPA": 100}
  ],
  "keyMilestones": ["milestone 1", "milestone 2", "milestone 3"],
  "skillsNeeded": [
    {"skill": "skill name", "importance": "Critical"}
  ],
  "examPathway": [
    {"exam": "exam name", "when": "Class 12 / After graduation", "importance": "Why this matters", "prepTime": "1-2 years"}
  ]
}`;

  try {
    const result = await generateCompletion(systemPrompt, userPrompt, 1500);
    const clean = result.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(clean) as CareerSimulation;
  } catch (error) {
    console.error("Simulation agent error:", error);
    return getDefaultSimulation(career);
  }
}

function getDefaultSimulation(career: string): CareerSimulation {
  return {
    career,
    timeline: [
      {
        phase: "Academic Foundation",
        duration: "2-4 years",
        activities: ["Focus on relevant subjects", "Build foundational skills"],
        outcome: "Strong academic base and entrance exam preparation",
      },
      {
        phase: "Higher Education",
        duration: "3-4 years",
        activities: ["Complete degree", "Internships", "Projects"],
        outcome: "Degree qualification and practical experience",
      },
      {
        phase: "Early Career",
        duration: "2-3 years",
        activities: ["Entry-level job", "Skill building", "Networking"],
        outcome: "2+ years experience, promotion to mid-level",
      },
    ],
    typicalDay: [
      "9 AM: Team standup and planning",
      "10 AM: Core work / deep focus sessions",
      "1 PM: Lunch and informal networking",
      "2 PM: Meetings, reviews, collaborations",
      "4 PM: Learning, side projects, wrapping up",
    ],
    salaryProgression: [
      { year: 1, minLPA: 5, maxLPA: 10 },
      { year: 3, minLPA: 10, maxLPA: 20 },
      { year: 5, minLPA: 18, maxLPA: 40 },
      { year: 10, minLPA: 35, maxLPA: 80 },
    ],
    keyMilestones: [
      "Complete relevant degree from top college",
      "Land first job at a reputable company",
      "Achieve first promotion / significant role",
    ],
    skillsNeeded: [
      { skill: "Domain Knowledge", importance: "Critical" },
      { skill: "Communication", importance: "High" },
      { skill: "Problem Solving", importance: "Critical" },
    ],
    examPathway: [
      {
        exam: "Relevant Entrance Exam",
        when: "Class 12 or after",
        importance: "Gateway to top colleges",
        prepTime: "1-2 years",
      },
    ],
  };
}
