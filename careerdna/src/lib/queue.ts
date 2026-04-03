import { Queue, Worker, QueueEvents } from "bullmq";

// Upstash Redis connection config for BullMQ
const connection = {
  host: new URL(process.env.REDIS_URL || "https://kind-drake-76374.upstash.io").hostname,
  port: 6379,
  password: process.env.REDIS_TOKEN,
  tls: {},
};

// Queue names
export const QUEUE_NAMES = {
  ASSESSMENT: "assessment-processing",
  RECOMMENDATIONS: "recommendation-generation",
  TRACKING: "progress-tracking",
} as const;

// Assessment Queue
export const assessmentQueue = new Queue(QUEUE_NAMES.ASSESSMENT, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  },
});

// Recommendation Queue
export const recommendationQueue = new Queue(QUEUE_NAMES.RECOMMENDATIONS, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  },
});

// Tracking Queue
export const trackingQueue = new Queue(QUEUE_NAMES.TRACKING, {
  connection,
  defaultJobOptions: {
    attempts: 2,
    removeOnComplete: { count: 200 },
    removeOnFail: { count: 50 },
  },
});

// Queue event listeners
export const assessmentQueueEvents = new QueueEvents(QUEUE_NAMES.ASSESSMENT, { connection });
export const recommendationQueueEvents = new QueueEvents(QUEUE_NAMES.RECOMMENDATIONS, { connection });

// Job type definitions
export interface AssessmentJobData {
  studentId: string;
  userId: string;
  answers: Record<string, unknown>;
  voiceTranscript?: string;
  marksheetBase64?: string;
}

export interface RecommendationJobData {
  studentId: string;
  userId: string;
  embedding: number[];
  answers: Record<string, unknown>;
}

export interface TrackingJobData {
  studentId: string;
  action: string;
  metadata?: Record<string, unknown>;
}

export { Worker, connection };
