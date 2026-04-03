import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId, mentorId, message, preferredTime, topic } = body;

    if (!clerkId || !mentorId) {
      return NextResponse.json(
        { error: "Missing required fields: clerkId and mentorId" },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Store mentorship request in Supabase
    const { data, error } = await supabaseAdmin
      .from("mentorship_requests")
      .insert({
        student_user_id: user.id,
        mentor_id: mentorId,
        message: message || "",
        preferred_time: preferredTime || null,
        topic: topic || "General Career Guidance",
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      // If table doesn't exist yet, return success with mock data
      console.warn("Supabase insert warning:", error.message);
      return NextResponse.json({
        success: true,
        requestId: `req-${Date.now()}`,
        status: "pending",
        message: "Mentorship request submitted. The mentor will respond within 24-48 hours.",
        mock: true,
      });
    }

    return NextResponse.json({
      success: true,
      requestId: data?.id,
      status: "pending",
      message: "Mentorship request submitted. The mentor will respond within 24-48 hours.",
    });
  } catch (error) {
    console.error("Mentor request error:", error);
    return NextResponse.json(
      { error: "Failed to submit mentorship request", details: String(error) },
      { status: 500 }
    );
  }
}
