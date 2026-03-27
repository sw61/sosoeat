'use client';

import { Suspense, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAuthStore } from '@/store/auth-store';

/**
 * 전용 OAuth 콜백 페이지
 * 백엔드 리다이렉트 주소: /oauth/callback?accessToken=...&refreshToken=...
 */
function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const error = searchParams.get('error');

    // 1. 에러가 있거나 accessToken이 없는 경우 로그인 페이지로 리다이렉트
    if (error || !accessToken) {
      console.error('[OAuthCallback] Error or Missing AccessToken:', error);
      router.replace('/login?error=social_login_failed');
      return;
    }

    const finalizeLogin = async () => {
      try {
        // 2. BFF(/api/auth/social-callback)를 통해 서버 세션 설정
        const response = await fetch('/api/auth/social-callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken, refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          // 3. Zustand 클라이언트 상태 업데이트
          login(data.user);
          // 4. 성공 시 메인 페이지로 이동
          router.replace('/');
        } else {
          console.error('[OAuthCallback] BFF session setting failed');
          router.replace('/login?error=session_error');
        }
      } catch (err) {
        console.error('[OAuthCallback] Unexpected error:', err);
        router.replace('/login?error=unknown_error');
      }
    };

    finalizeLogin();
  }, [searchParams, login, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-sosoeat-gray-900 mb-4 text-2xl font-bold">로그인 처리 중...</h1>
        <p className="text-sosoeat-gray-600">잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
