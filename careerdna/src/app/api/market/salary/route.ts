import { NextRequest, NextResponse } from "next/server";
import { runMarketAgent } from "@/agents/marketAgent";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const career = searchParams.get("career") || undefined;
    const city = searchParams.get("city") || undefined;

    const { salaryData, insights } = await runMarketAgent(career);

    // Filter by city if provided
    let filtered = salaryData;
    if (city) {
      filtered = filtered.filter(
        (s) =>
          s.city.toLowerCase().includes(city.toLowerCase()) ||
          s.city === "Pan India"
      );
    }

    // Build chart-friendly data
    const chartData = buildChartData(filtered);
    const careerInsight = career
      ? insights.find((i) => i.career.toLowerCase().includes(career.toLowerCase()))
      : null;

    return NextResponse.json({
      success: true,
      salaryData: filtered,
      chartData,
      insight: careerInsight,
    });
  } catch (error) {
    console.error("Salary data fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch salary data", details: String(error) },
      { status: 500 }
    );
  }
}

function buildChartData(
  salaryData: { career: string; level: string; minLPA: number; maxLPA: number; medianLPA: number }[]
) {
  // Group by career for comparison charts
  const byCareer: Record<
    string,
    { entry: number; mid: number; senior: number }
  > = {};

  for (const row of salaryData) {
    if (!byCareer[row.career]) {
      byCareer[row.career] = { entry: 0, mid: 0, senior: 0 };
    }
    if (row.level === "Entry") byCareer[row.career].entry = row.medianLPA;
    if (row.level === "Mid") byCareer[row.career].mid = row.medianLPA;
    if (row.level === "Senior") byCareer[row.career].senior = row.medianLPA;
  }

  return Object.entries(byCareer).map(([career, salaries]) => ({
    career,
    ...salaries,
  }));
}
