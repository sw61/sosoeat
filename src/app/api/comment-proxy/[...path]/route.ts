import { NextRequest } from 'next/server';

import { createProxyRequest } from '@/shared/lib/proxy-handler';

const COMMENT_SERVER_URL = process.env.COMMENT_SERVER_URL;

/**
 * [BFF] /api/comment-proxy/[...path]
 * comment server(Railway Express)로 요청을 프록시합니다.
 * httpOnly 쿠키의 accessToken을 Authorization 헤더에 삽입합니다.
 * 401 응답 시 refreshToken으로 토큰을 갱신하고 원래 요청을 1회 재시도합니다.
 */
async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetUrl = `${COMMENT_SERVER_URL?.replace(/\/$/, '')}/${path.join('/')}${request.nextUrl.search}`;

  const body =
    request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined;

  return createProxyRequest(request, targetUrl, body);
}

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
