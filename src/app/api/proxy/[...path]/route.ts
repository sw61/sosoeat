import { NextRequest } from 'next/server';

import { createProxyRequest } from '@/shared/lib/proxy-handler';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] /api/proxy/[...path]
 * 모든 API 요청을 백엔드로 프록시하며, httpOnly 쿠키의 accessToken을 Authorization 헤더에 삽입합니다.
 * 401 응답 시 refreshToken으로 토큰을 갱신하고 원래 요청을 1회 재시도합니다.
 * silentRefresh 실패 시 401을 그대로 클라이언트에 반환합니다.
 * fetchClient에서 /api/proxy/의 401을 감지하여 /login으로 리다이렉트 처리합니다.
 */

async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetUrl = `${BASE_URL}/${TEAM_ID}/${path.join('/')}${request.nextUrl.search}`;

  // body를 handler에서 미리 읽어두어 재시도 시 재사용
  const body =
    request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined;

  return createProxyRequest(request, targetUrl, body);
}

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
