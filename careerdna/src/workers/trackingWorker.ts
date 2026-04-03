import { Worker, Job } from "bullmq";
import { connection, QUEUE_NAMES, TrackingJobData } from "@/lib/queue";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";

const BADGE_TRIGGERS: Record<string, { name: string; description: string }> = {
  "assessment-complete": {
    name: "Assessment Complete",
    description: "Completed the CareerDNA personality and skills assessment",
  },
  "mentor-connected": {
    name: "Mentor Connect",
    description: "Successfully connected with a career mentor",
  },
  "career-explored": {
    name: "Career Explorer",
    description: "Explored career paths and read detailed insights",
  },
  "roadmap-viewed": {
    name: "Roadmap Reader",
    description: "Viewed your complete career roadmap",
  },
};

async function processTracking(job: Job<TrackingJobData>) {
  const { studentId, action, metadata } = job.data;

  console.log(`[TrackingWorker] Processing action '${action}' for student ${studentId}`);

  // Log to Supabase analytics table
  try {
    await supabaseAdmin.from("activity_log").insert({
      student_id: studentId,
      action,
      metadata: metadata || {},
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("[TrackingWorker] Supabase log failed (table may not exist):", err);
  }

  // Check if action triggers a badge
  const badgeTrigger = BADGE_TRIGGERS[action];
  if (badgeTrigger) {
    // Check if student already has this badge
    const existing = await prisma.badge.findFirst({
      where: { studentId, name: badgeTrigger.name },
    });

    if (!existing) {
      await prisma.badge.create({
        data: {
          studentId,
          name: badgeTrigger.name,
          description: badgeTrigger.description,
        },
      });
      console.log(`[TrackingWorker] Badge '${badgeTrigger.name}' awarded to student ${studentId}`);
    }
  }

  return { studentId, action, processed: true };
}

export function startTrackingWorker() {
  const worker = new Worker<TrackingJobData>(
    QUEUE_NAMES.TRACKING,
    processTracking,
    {
      connection,
      concurrency: 10,
    }
  );

  worker.on("completed", (job) => {
    console.log(`[TrackingWorker] Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[TrackingWorker] Job ${job?.id} failed:`, err);
  });

  console.log("[TrackingWorker] Worker started");
  return worker;
}
