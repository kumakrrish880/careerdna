import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CAREERS } from '@/lib/constants';

export async function GET(req: NextRequest) {
  return NextResponse.json({ careers: MOCK_CAREERS });
}
