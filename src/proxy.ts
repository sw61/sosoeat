import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * [Proxy] Next.js 16
 * 페이지 접근 권한을 제어합니다.
 * /mypage 진입 시에만 토큰 유무를 쿠키(`refreshToken`)로 판단합니다.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has('refreshToken');

  // 마이페이지(/mypage) 보호된 경로로 설정
  const isProtectedRoute = pathname.startsWith('/mypage');

  if (isProtectedRoute && !hasSession) {
    // 세션이 없는데 마이페이지 진입 시 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 그 외 모든 경로는 자유롭게 접근 가능
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/mypage/:path*'],
};
