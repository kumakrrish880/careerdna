import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  await new Promise(resolve => setTimeout(resolve, 100));
  return NextResponse.json({
    success: true,
    dnaProfile: {
      analytical: Math.floor(Math.random() * 30) + 65,
      creative: Math.floor(Math.random() * 30) + 55,
      technical: Math.floor(Math.random() * 30) + 70,
      communication: Math.floor(Math.random() * 30) + 60,
      leadership: Math.floor(Math.random() * 30) + 50,
      empathy: Math.floor(Math.random() * 30) + 65,
    },
    topCareers: ['AI/ML Engineer', 'Product Designer', 'Startup Founder'],
  });
}
