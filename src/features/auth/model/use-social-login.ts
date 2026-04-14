'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { STORAGE_KEYS } from '@/shared/lib/storage-keys';
import { isSafeCallbackUrl } from '@/shared/utils/url';

import { useSocialLoginMutation } from './auth.mutations';

/**
 * [Feature] useSocialLogin
 * 소셜 로그인 콜백 처리: URL에서 accessToken/refreshToken을 추출하여 mutation 실행
 * 모든 성공/실패 처리는 useSocialLoginMutation의 onSuccess/onError에서 담당합니다.
 */
export const useSocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // BFF 중복 호출 방지
  const isProcessed = useRef(false);

  const mutation = useSocialLoginMutation();

  useEffect(() => {
    if (isProcessed.current) return;
    isProcessed.current = true;

    const accessToken = searchParams?.get('accessToken');
    const refreshToken = searchParams?.get('refreshToken');
    const error = searchParams?.get('error');

    if (error || !accessToken || !refreshToken) {
      console.error('[OAuthCallback] Error or Missing tokens:', error);
      sessionStorage.removeItem(STORAGE_KEYS.SOCIAL_LOGIN_CALLBACK_URL);
      router.replace('/login?error=social_login_failed');
      return;
    }

    // callback URL이 있으면 sessionStorage에 저장 (mutation의 onSuccess에서 사용)
    const callbackUrl = searchParams?.get('callbackUrl');
    if (callbackUrl && isSafeCallbackUrl(callbackUrl)) {
      sessionStorage.setItem(STORAGE_KEYS.SOCIAL_LOGIN_CALLBACK_URL, callbackUrl);
    }

    // mutation 실행 (모든 처리는 mutations.ts의 onSuccess/onError에서 담당)
    mutation.mutate({ accessToken, refreshToken });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mutation;
};
