import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runVerificationAgent } from "@/agents/verificationAgent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId, studentId, badgeName, badgeDescription, badgeImageUrl } = body;

    if (!badgeName || (!clerkId && !studentId)) {
      return NextResponse.json(
        { error: "Missing required fields: badgeName and (clerkId or studentId)" },
        { status: 400 }
      );
    }

    // Resolve student
    let resolvedStudentId = studentId;
    let studentName: string | undefined;

    if (!resolvedStudentId && clerkId) {
      const user = await prisma.user.findUnique({
        where: { clerkId },
        include: { student: true },
      });
      if (!user?.student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
      }
      resolvedStudentId = user.student.id;
      studentName = user.name || undefined;
    }

    // Run blockchain verification agent
    const blockchainData = await runVerificationAgent(
      resolvedStudentId,
      badgeName,
      badgeDescription || `Achievement badge for ${badgeName}`,
      studentName
    );

    // Store badge in database
    const badge = await prisma.badge.create({
      data: {
        studentId: resolvedStudentId,
        name: badgeName,
        description: badgeDescription || `Achievement: ${badgeName}`,
        imageUrl: badgeImageUrl || blockchainData.metadata.image,
        blockchainTx: blockchainData.transactionHash,
        ipfsHash: blockchainData.ipfsHash,
      },
    });

    // Update student progress
    await prisma.student.update({
      where: { id: resolvedStudentId },
      data: { progress: { increment: 10 } },
    });

    return NextResponse.json({
      success: true,
      badge: {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        imageUrl: badge.imageUrl,
        earnedAt: badge.earnedAt,
      },
      blockchain: {
        transactionHash: blockchainData.transactionHash,
        tokenId: blockchainData.tokenId,
        contractAddress: blockchainData.contractAddress,
        network: blockchainData.networkName,
        ipfsHash: blockchainData.ipfsHash,
        ipfsUrl: blockchainData.ipfsUrl,
        verificationUrl: blockchainData.verificationUrl,
        blockNumber: blockchainData.blockNumber,
      },
    });
  } catch (error) {
    console.error("Badge mint error:", error);
    return NextResponse.json(
      { error: "Failed to mint badge", details: String(error) },
      { status: 500 }
    );
  }
}
