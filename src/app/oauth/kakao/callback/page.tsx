'use client';

import { Suspense, useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useKakaoLoginMutation } from '@/features/auth';

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProcessed = useRef(false);
  const mutation = useKakaoLoginMutation();

  useEffect(() => {
    if (isProcessed.current) return;
    isProcessed.current = true;

    const code = searchParams?.get('code');
    const error = searchParams?.get('error');

    if (error || !code) {
      router.replace('/login?error=social_login_failed');
      return;
    }

    mutation.mutate(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-sosoeat-gray-900 mb-4 text-2xl font-bold">로그인 처리 중...</h1>
        <p className="text-sosoeat-gray-600">잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}
    >
      <KakaoCallbackContent />
    </Suspense>
  );
}
