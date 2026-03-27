import { NextResponse } from 'next/server';

import { SignupRequest, User } from '@/types/generated-client/models';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] POST /api/auth/signup
 * 회원가입 요청을 외부 API로 프록시합니다.
 */
export async function POST(request: Request) {
  try {
    const body: SignupRequest = await request.json();

    const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: response.status });
    }

    const data: User = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('[AuthSignupBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
