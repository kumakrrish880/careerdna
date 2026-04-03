import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";
import { getCached, setCached } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const expertise = searchParams.get("expertise") || undefined;
    const verified = searchParams.get("verified");
    const limit = parseInt(searchParams.get("limit") || "20");

    const cacheKey = `mentors:${expertise || "all"}:${verified || "any"}`;
    const cached = await getCached(cacheKey);
    if (cached) {
      return NextResponse.json({ source: "cache", data: cached });
    }

    // Fetch from Prisma/Postgres
    const mentors = await prisma.mentor.findMany({
      where: {
        ...(verified === "true" ? { isVerified: true } : {}),
        ...(expertise
          ? {
              expertise: {
                path: "$",
                array_contains: expertise,
              },
            }
          : {}),
      },
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { rating: "desc" },
      take: limit,
    });

    // If no mentors in DB yet, return seeded mock data
    const responseData =
      mentors.length > 0 ? mentors : getMockMentors(expertise);

    await setCached(cacheKey, responseData, 300); // Cache 5 min

    return NextResponse.json({ source: "database", data: responseData });
  } catch (error) {
    console.error("Mentors fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentors", details: String(error) },
      { status: 500 }
    );
  }
}

function getMockMentors(expertise?: string) {
  const allMentors = [
    {
      id: "mentor-001",
      name: "Priya Sharma",
      title: "Senior Software Engineer",
      company: "Google",
      expertise: ["Software Engineering", "Machine Learning", "Python"],
      rating: 4.9,
      isVerified: true,
      bio: "8 years at Google, IIT Delhi alumni. Mentored 50+ students into top tech companies.",
      availability: "Weekends",
      sessionsCompleted: 127,
      city: "Bengaluru",
    },
    {
      id: "mentor-002",
      name: "Rahul Verma",
      title: "Product Manager",
      company: "Flipkart",
      expertise: ["Product Management", "Strategy", "Analytics"],
      rating: 4.8,
      isVerified: true,
      bio: "Led 3 successful product launches at Flipkart. IIM Ahmedabad MBA.",
      availability: "Evenings",
      sessionsCompleted: 89,
      city: "Bengaluru",
    },
    {
      id: "mentor-003",
      name: "Dr. Ananya Krishnan",
      title: "Cardiologist",
      company: "AIIMS Delhi",
      expertise: ["Medicine", "NEET Preparation", "MBBS", "Research"],
      rating: 4.7,
      isVerified: true,
      bio: "AIIMS graduate, currently practicing cardiologist. Happy to guide NEET aspirants.",
      availability: "Sundays",
      sessionsCompleted: 64,
      city: "Delhi",
    },
    {
      id: "mentor-004",
      name: "Vikram Mehta",
      title: "IAS Officer (2015 Batch)",
      company: "Government of India",
      expertise: ["Civil Services", "UPSC", "Public Policy", "Leadership"],
      rating: 4.9,
      isVerified: true,
      bio: "IAS 2015 batch, currently Joint Secretary. All India Rank 28 in UPSC.",
      availability: "Saturday mornings",
      sessionsCompleted: 203,
      city: "Delhi",
    },
    {
      id: "mentor-005",
      name: "Sneha Patel",
      title: "UX Design Lead",
      company: "Zomato",
      expertise: ["UX Design", "UI Design", "Figma", "User Research"],
      rating: 4.6,
      isVerified: true,
      bio: "Design lead at Zomato. Passionate about making design accessible to all students.",
      availability: "Flexible",
      sessionsCompleted: 45,
      city: "Bengaluru",
    },
    {
      id: "mentor-006",
      name: "CA Amit Joshi",
      title: "Partner, Big 4",
      company: "Deloitte",
      expertise: ["Chartered Accountancy", "Finance", "CA Exam", "Tax"],
      rating: 4.5,
      isVerified: true,
      bio: "CA with 12 years at Big 4. Cleared CA exams in first attempt. AIR 15.",
      availability: "Weekdays evenings",
      sessionsCompleted: 78,
      city: "Mumbai",
    },
  ];

  if (!expertise) return allMentors;
  return allMentors.filter((m) =>
    m.expertise.some((e) => e.toLowerCase().includes(expertise.toLowerCase()))
  );
}
