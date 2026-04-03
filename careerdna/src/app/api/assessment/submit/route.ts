import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assessmentQueue } from "@/lib/queue";
import { runVisionAgent, marksheetToText } from "@/agents/visionAgent";
import { runCareerDNAAgent } from "@/agents/careerDNAAgent";
import { runParserAgent, profileToEmbeddingText } from "@/agents/parserAgent";
import { generateEmbedding } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clerkId,
      answers,
      voiceTranscript,
      marksheetBase64,
      class: studentClass,
      stream,
      city,
    } = body;

    if (!clerkId || !answers) {
      return NextResponse.json(
        { error: "Missing required fields: clerkId and answers" },
        { status: 400 }
      );
    }

    // Get or create user and student record
    let user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: "User not found. Please sign up first." }, { status: 404 });
    }

    let student = await prisma.student.findUnique({ where: { userId: user.id } });
    if (!student) {
      student = await prisma.student.create({
        data: {
          userId: user.id,
          class: studentClass,
          stream,
          city,
        },
      });
    } else {
      student = await prisma.student.update({
        where: { id: student.id },
        data: { class: studentClass, stream, city },
      });
    }

    // Parse marksheet if provided
    let marksheetData = "";
    if (marksheetBase64) {
      try {
        const marksheet = await runVisionAgent(marksheetBase64);
        marksheetData = marksheetToText(marksheet);
      } catch (err) {
        console.warn("Marksheet OCR failed, continuing without it:", err);
      }
    }

    // Parse voice transcript and answers into structured profile
    const rawText = [
      JSON.stringify(answers),
      voiceTranscript || "",
      marksheetData,
    ].join("\n");

    const parsedProfile = await runParserAgent(rawText, voiceTranscript ? "voice" : "assessment");
    const profileText = profileToEmbeddingText(parsedProfile);

    // Run CareerDNA Agent
    const { vectorId, embedding, matches } = await runCareerDNAAgent({
      studentId: student.id,
      answers,
      voiceTranscript,
      stream,
      class: studentClass,
      city,
      marksheetData,
    });

    // Update student record
    await prisma.student.update({
      where: { id: student.id },
      data: {
        assessmentAnswers: answers,
        voiceTranscript: voiceTranscript || null,
        careerDnaId: vectorId,
        careerMatches: matches as unknown as Record<string, unknown>[],
        progress: 25,
      },
    });

    // Queue recommendation generation
    await assessmentQueue.add(
      "generate-recommendations",
      {
        studentId: student.id,
        userId: user.id,
        answers,
        voiceTranscript,
        embedding,
        stream,
        class: studentClass,
        city,
        marksheetData,
      },
      { priority: 1 }
    );

    return NextResponse.json({
      success: true,
      studentId: student.id,
      vectorId,
      initialMatches: matches.slice(0, 3),
      message: "Assessment submitted. Detailed recommendations are being generated.",
    });
  } catch (error) {
    console.error("Assessment submit error:", error);
    return NextResponse.json(
      { error: "Failed to process assessment", details: String(error) },
      { status: 500 }
    );
  }
}
