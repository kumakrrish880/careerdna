import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyBadgeOnChain } from "@/agents/verificationAgent";

export async function GET(
  req: NextRequest,
  { params }: { params: { badgeId: string } }
) {
  try {
    const badgeId = params?.badgeId || new URL(req.url).searchParams.get("badgeId");

    if (!badgeId) {
      return NextResponse.json({ error: "Missing badgeId" }, { status: 400 });
    }

    // Find badge in DB
    const badge = await prisma.badge.findUnique({
      where: { id: badgeId },
      include: {
        student: {
          include: { user: { select: { name: true, email: true } } },
        },
      },
    });

    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    // Verify on chain
    let onChainVerification = { verified: false, details: {} };
    if (badge.blockchainTx) {
      onChainVerification = await verifyBadgeOnChain(badge.blockchainTx);
    }

    return NextResponse.json({
      success: true,
      badge: {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        imageUrl: badge.imageUrl,
        earnedAt: badge.earnedAt,
        student: {
          name: badge.student.user.name,
        },
      },
      blockchain: {
        transactionHash: badge.blockchainTx,
        ipfsHash: badge.ipfsHash,
        verified: onChainVerification.verified,
        details: onChainVerification.details,
      },
    });
  } catch (error) {
    console.error("Badge verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify badge", details: String(error) },
      { status: 500 }
    );
  }
}
