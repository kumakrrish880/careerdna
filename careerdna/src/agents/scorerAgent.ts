import { CareerMatch } from "./careerDNAAgent";

export interface ScoredCareer extends CareerMatch {
  dnaScore: number;
  marketScore: number;
  preferenceScore: number;
  finalScore: number;
  rank: number;
  marketDemand: "High" | "Medium" | "Low";
  avgSalary: string;
  growthRate: string;
}

export interface MarketDemandData {
  career: string;
  demandScore: number;
  avgSalaryLPA: number;
  growthRate: number;
  openings: number;
}

// Indian market demand data (updated Q1 2025)
const MARKET_DEMAND: Record<string, MarketDemandData> = {
  "Software Engineer": {
    career: "Software Engineer",
    demandScore: 95,
    avgSalaryLPA: 12,
    growthRate: 22,
    openings: 450000,
  },
  "Data Scientist": {
    career: "Data Scientist",
    demandScore: 92,
    avgSalaryLPA: 15,
    growthRate: 35,
    openings: 95000,
  },
  "Product Manager": {
    career: "Product Manager",
    demandScore: 88,
    avgSalaryLPA: 18,
    growthRate: 28,
    openings: 35000,
  },
  "UX Designer": {
    career: "UX Designer",
    demandScore: 82,
    avgSalaryLPA: 10,
    growthRate: 25,
    openings: 42000,
  },
  "Civil Services (IAS/IPS)": {
    career: "Civil Services (IAS/IPS)",
    demandScore: 70,
    avgSalaryLPA: 8,
    growthRate: 5,
    openings: 1200,
  },
  "Doctor (MBBS/MD)": {
    career: "Doctor (MBBS/MD)",
    demandScore: 85,
    avgSalaryLPA: 14,
    growthRate: 18,
    openings: 55000,
  },
  "Chartered Accountant": {
    career: "Chartered Accountant",
    demandScore: 80,
    avgSalaryLPA: 9,
    growthRate: 12,
    openings: 68000,
  },
  Entrepreneur: {
    career: "Entrepreneur",
    demandScore: 75,
    avgSalaryLPA: 20,
    growthRate: 40,
    openings: 999999,
  },
};

export function runScorerAgent(
  careers: CareerMatch[],
  studentAnswers: Record<string, unknown>
): ScoredCareer[] {
  const preferenceMap = buildPreferenceMap(studentAnswers);

  const scored: ScoredCareer[] = careers.map((career) => {
    // DNA match score (60% weight)
    const dnaScore = career.matchScore;

    // Market demand score (30% weight)
    const marketData = MARKET_DEMAND[career.career];
    const marketScore = marketData?.demandScore || 70;

    // Preference alignment score (10% weight)
    const preferenceScore = calculatePreferenceScore(career.career, preferenceMap);

    // Weighted final score
    const finalScore = Math.round(
      dnaScore * 0.6 + marketScore * 0.3 + preferenceScore * 0.1
    );

    const demandLevel: "High" | "Medium" | "Low" =
      marketScore >= 85 ? "High" : marketScore >= 70 ? "Medium" : "Low";

    return {
      ...career,
      dnaScore,
      marketScore,
      preferenceScore,
      finalScore,
      rank: 0,
      marketDemand: demandLevel,
      avgSalary: marketData ? `₹${marketData.avgSalaryLPA}L/yr` : "₹8-12L/yr",
      growthRate: marketData ? `${marketData.growthRate}% YoY` : "15% YoY",
    };
  });

  // Sort by final score and assign ranks
  scored.sort((a, b) => b.finalScore - a.finalScore);
  scored.forEach((career, idx) => {
    career.rank = idx + 1;
  });

  return scored;
}

function buildPreferenceMap(answers: Record<string, unknown>): Record<string, number> {
  const map: Record<string, number> = {};

  // Map common answer patterns to career preferences
  const workStyle = answers["work_style"] || answers["workStyle"];
  if (workStyle === "creative") {
    map["UX Designer"] = 90;
    map["Entrepreneur"] = 85;
  } else if (workStyle === "analytical") {
    map["Data Scientist"] = 90;
    map["Software Engineer"] = 85;
    map["Chartered Accountant"] = 80;
  } else if (workStyle === "helping") {
    map["Doctor (MBBS/MD)"] = 90;
    map["Civil Services (IAS/IPS)"] = 85;
  }

  const salaryPref = answers["salary_priority"] || answers["salaryPriority"];
  if (salaryPref === "high") {
    map["Product Manager"] = (map["Product Manager"] || 70) + 10;
    map["Data Scientist"] = (map["Data Scientist"] || 70) + 10;
  }

  return map;
}

function calculatePreferenceScore(
  career: string,
  preferenceMap: Record<string, number>
): number {
  return preferenceMap[career] || 65;
}
