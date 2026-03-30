'use client';

import { Suspense } from 'react';

import { useSocialLogin } from '@/services/auth';

/**
 * 전용 OAuth 콜백 페이지
 * 백엔드 리다이렉트 주소: /oauth/callback?accessToken=...&refreshToken=...
 */
function OAuthCallbackContent() {
  useSocialLogin();

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
