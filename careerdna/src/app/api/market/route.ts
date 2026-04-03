import { NextRequest, NextResponse } from 'next/server';
import { MOCK_JOBS } from '@/lib/constants';

export async function GET(req: NextRequest) {
  return NextResponse.json({ jobs: MOCK_JOBS });
}
