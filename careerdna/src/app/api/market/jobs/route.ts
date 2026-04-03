import { NextRequest, NextResponse } from "next/server";
import { runMarketAgent } from "@/agents/marketAgent";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const career = searchParams.get("career") || undefined;
    const location = searchParams.get("location") || undefined;
    const type = searchParams.get("type") || undefined;
    const limit = parseInt(searchParams.get("limit") || "10");

    const { jobs } = await runMarketAgent(career);

    // Apply filters
    let filtered = jobs;
    if (location) {
      filtered = filtered.filter((j) =>
        j.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (type) {
      filtered = filtered.filter((j) =>
        j.type.toLowerCase() === type.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      jobs: filtered.slice(0, limit),
      filters: { career, location, type },
    });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs", details: String(error) },
      { status: 500 }
    );
  }
}
