import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { trackingQueue } from "@/lib/queue";

const MILESTONE_BADGES = [
  { threshold: 25, name: "Assessment Complete", description: "Completed your CareerDNA assessment" },
  { threshold: 50, name: "Career Explorer", description: "Explored career paths and market data" },
  { threshold: 75, name: "Mentor Connect", description: "Connected with a mentor" },
  { threshold: 100, name: "CareerDNA Pro", description: "Completed your full career roadmap" },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        student: {
          include: {
            badges: { orderBy: { earnedAt: "desc" } },
            recommendations: { select: { id: true, createdAt: true }, take: 1 },
          },
        },
      },
    });

    if (!user?.student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const student = user.student;
    const nextMilestone = MILESTONE_BADGES.find((m) => m.threshold > student.progress);

    return NextResponse.json({
      progress: student.progress,
      lastCheckin: student.lastCheckin,
      badges: student.badges,
      hasRecommendations: student.recommendations.length > 0,
      nextMilestone: nextMilestone || null,
      milestones: MILESTONE_BADGES.map((m) => ({
        ...m,
        achieved: student.progress >= m.threshold,
      })),
    });
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId, action, increment = 5, metadata } = body;

    if (!clerkId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: clerkId and action" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { student: true },
    });

    if (!user?.student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const oldProgress = user.student.progress;
    const newProgress = Math.min(100, oldProgress + increment);

    const updatedStudent = await prisma.student.update({
      where: { id: user.student.id },
      data: {
        progress: newProgress,
        lastCheckin: new Date(),
      },
    });

    // Check for newly unlocked milestones
    const newMilestones = MILESTONE_BADGES.filter(
      (m) => m.threshold > oldProgress && m.threshold <= newProgress
    );

    // Queue tracking job for analytics
    await trackingQueue.add("track-progress", {
      studentId: user.student.id,
      action,
      oldProgress,
      newProgress,
      metadata,
    });

    return NextResponse.json({
      success: true,
      progress: updatedStudent.progress,
      newMilestones,
      message:
        newMilestones.length > 0
          ? `Milestone unlocked: ${newMilestones.map((m) => m.name).join(", ")}`
          : "Progress updated",
    });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
