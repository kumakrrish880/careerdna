import { getCached, setCached } from "@/lib/redis";

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  skills: string[];
  experience: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  postedAt: string;
  applyUrl: string;
  description: string;
}

export interface SalaryDataPoint {
  career: string;
  level: string;
  minLPA: number;
  maxLPA: number;
  medianLPA: number;
  currency: string;
  city: string;
  year: number;
}

export interface MarketInsight {
  career: string;
  demandTrend: "Rising" | "Stable" | "Declining";
  openings: number;
  topCompanies: string[];
  topCities: string[];
  avgSalaryLPA: number;
  yoyGrowth: number;
  topSkillsRequired: string[];
}

const MOCK_JOBS: JobListing[] = [
  {
    id: "job-001",
    title: "Software Development Engineer",
    company: "Amazon",
    location: "Bengaluru, Karnataka",
    salaryMin: 1800000,
    salaryMax: 3500000,
    salaryCurrency: "INR",
    skills: ["Java", "AWS", "System Design", "Data Structures"],
    experience: "0-2 years",
    type: "Full-time",
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    applyUrl: "https://amazon.jobs",
    description: "Join the world's largest e-commerce company as an SDE.",
  },
  {
    id: "job-002",
    title: "Data Analyst",
    company: "Flipkart",
    location: "Bengaluru, Karnataka",
    salaryMin: 800000,
    salaryMax: 1500000,
    salaryCurrency: "INR",
    skills: ["Python", "SQL", "Tableau", "Statistics"],
    experience: "0-1 years",
    type: "Full-time",
    postedAt: new Date(Date.now() - 172800000).toISOString(),
    applyUrl: "https://flipkart.com/careers",
    description: "Drive data-driven decisions at India's leading e-commerce platform.",
  },
  {
    id: "job-003",
    title: "Product Manager - Intern",
    company: "Razorpay",
    location: "Bengaluru, Karnataka",
    salaryMin: 60000,
    salaryMax: 80000,
    salaryCurrency: "INR",
    skills: ["Product Strategy", "Analytics", "Communication", "SQL"],
    experience: "Fresher",
    type: "Internship",
    postedAt: new Date(Date.now() - 259200000).toISOString(),
    applyUrl: "https://razorpay.com/careers",
    description: "6-month PM internship at India's leading fintech unicorn.",
  },
  {
    id: "job-004",
    title: "Machine Learning Engineer",
    company: "Swiggy",
    location: "Bengaluru, Karnataka",
    salaryMin: 2000000,
    salaryMax: 4000000,
    salaryCurrency: "INR",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Statistics"],
    experience: "1-3 years",
    type: "Full-time",
    postedAt: new Date(Date.now() - 345600000).toISOString(),
    applyUrl: "https://swiggy.com/careers",
    description: "Build ML models that power food delivery for 500M+ users.",
  },
  {
    id: "job-005",
    title: "UI/UX Designer",
    company: "Zomato",
    location: "Gurugram, Haryana",
    salaryMin: 600000,
    salaryMax: 1200000,
    salaryCurrency: "INR",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    experience: "0-2 years",
    type: "Full-time",
    postedAt: new Date(Date.now() - 432000000).toISOString(),
    applyUrl: "https://zomato.com/careers",
    description: "Shape the visual experience of India's favourite food app.",
  },
  {
    id: "job-006",
    title: "Backend Engineer",
    company: "CRED",
    location: "Bengaluru, Karnataka",
    salaryMin: 1500000,
    salaryMax: 3000000,
    salaryCurrency: "INR",
    skills: ["Go", "Microservices", "Kubernetes", "PostgreSQL"],
    experience: "1-4 years",
    type: "Full-time",
    postedAt: new Date(Date.now() - 518400000).toISOString(),
    applyUrl: "https://cred.club/careers",
    description: "Build high-performance fintech infrastructure at CRED.",
  },
];

const SALARY_DATA: SalaryDataPoint[] = [
  { career: "Software Engineer", level: "Entry", minLPA: 6, maxLPA: 15, medianLPA: 9, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Software Engineer", level: "Mid", minLPA: 15, maxLPA: 35, medianLPA: 22, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Software Engineer", level: "Senior", minLPA: 30, maxLPA: 80, medianLPA: 45, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Data Scientist", level: "Entry", minLPA: 7, maxLPA: 18, medianLPA: 12, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Data Scientist", level: "Mid", minLPA: 18, maxLPA: 40, medianLPA: 25, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Data Scientist", level: "Senior", minLPA: 35, maxLPA: 90, medianLPA: 55, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Product Manager", level: "Entry", minLPA: 10, maxLPA: 25, medianLPA: 16, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Product Manager", level: "Mid", minLPA: 20, maxLPA: 50, medianLPA: 30, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Product Manager", level: "Senior", minLPA: 40, maxLPA: 100, medianLPA: 60, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "UX Designer", level: "Entry", minLPA: 4, maxLPA: 12, medianLPA: 7, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "UX Designer", level: "Mid", minLPA: 10, maxLPA: 25, medianLPA: 16, currency: "INR", city: "Bengaluru", year: 2025 },
  { career: "Doctor (MBBS/MD)", level: "Entry", minLPA: 6, maxLPA: 15, medianLPA: 9, currency: "INR", city: "Pan India", year: 2025 },
  { career: "Chartered Accountant", level: "Entry", minLPA: 5, maxLPA: 12, medianLPA: 8, currency: "INR", city: "Mumbai", year: 2025 },
  { career: "Civil Services (IAS/IPS)", level: "Entry", minLPA: 6, maxLPA: 10, medianLPA: 7.5, currency: "INR", city: "Pan India", year: 2025 },
];

export async function runMarketAgent(career?: string): Promise<{
  jobs: JobListing[];
  salaryData: SalaryDataPoint[];
  insights: MarketInsight[];
}> {
  const cacheKey = `market:${career || "all"}`;
  const cached = await getCached<{
    jobs: JobListing[];
    salaryData: SalaryDataPoint[];
    insights: MarketInsight[];
  }>(cacheKey);

  if (cached) return cached;

  const jobs = career
    ? MOCK_JOBS.filter(
        (j) =>
          j.title.toLowerCase().includes(career.toLowerCase()) ||
          j.skills.some((s) => s.toLowerCase().includes(career.toLowerCase()))
      )
    : MOCK_JOBS;

  const salaryData = career
    ? SALARY_DATA.filter((s) => s.career.toLowerCase().includes(career.toLowerCase()))
    : SALARY_DATA;

  const insights: MarketInsight[] = [
    {
      career: "Software Engineer",
      demandTrend: "Rising",
      openings: 450000,
      topCompanies: ["TCS", "Infosys", "Google", "Microsoft", "Amazon"],
      topCities: ["Bengaluru", "Hyderabad", "Pune", "Chennai", "Mumbai"],
      avgSalaryLPA: 12,
      yoyGrowth: 22,
      topSkillsRequired: ["JavaScript", "Python", "Cloud", "System Design"],
    },
    {
      career: "Data Scientist",
      demandTrend: "Rising",
      openings: 95000,
      topCompanies: ["Flipkart", "Swiggy", "Meesho", "PhonePe", "Juspay"],
      topCities: ["Bengaluru", "Hyderabad", "Mumbai"],
      avgSalaryLPA: 15,
      yoyGrowth: 35,
      topSkillsRequired: ["Python", "ML", "Statistics", "SQL", "TensorFlow"],
    },
  ];

  const result = { jobs, salaryData, insights };
  await setCached(cacheKey, result, 3600); // Cache for 1 hour

  return result;
}
