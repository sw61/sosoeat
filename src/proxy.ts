import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * [Middleware] Next.js
 * 페이지 접근 권한을 제어합니다.
 * /mypage 진입 시 refreshToken 유무로 세션을 확인하고,
 * accessToken이 없으면 /api/auth/refresh를 호출하여 갱신합니다.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const callbackUrl = encodeURIComponent(`${pathname}${search}`);
  const isProtectedRoute = pathname.startsWith('/mypage') || pathname.startsWith('/sosotalk/write');

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasRefreshToken = request.cookies.has('refreshToken');
  if (!hasRefreshToken) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
  }

  const hasAccessToken = request.cookies.has('accessToken');
  if (hasAccessToken) {
    return NextResponse.next();
  }

  // accessToken 만료 → Route Handler를 통해 갱신
  const refreshRes = await fetch(new URL('/api/auth/refresh', request.url), {
    method: 'POST',
    headers: { cookie: request.headers.get('cookie') ?? '' },
  });

  if (!refreshRes.ok) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
  }

  // 갱신된 쿠키를 응답에 반영
  const response = NextResponse.next();
  refreshRes.headers.getSetCookie().forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });
  return response;
}

export const config = {
  matcher: ['/mypage/:path*', '/sosotalk/write', '/sosotalk/write/:path*'],
};
