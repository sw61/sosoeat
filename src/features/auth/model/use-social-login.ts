'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore, useSocialLoginMutation } from '@/entities/auth';
import { favoriteKeys, favoritesApi } from '@/entities/favorites';
import { getSafeCallbackUrl, SOCIAL_CALLBACK_URL_KEY } from '@/shared/utils/url';

export const useSocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  // BFF 중복 호출 방지: 의존성 변경으로 useEffect가 재실행되어도 한 번만 실행
  const isProcessed = useRef(false);

  const mutation = useSocialLoginMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isProcessed.current) return;
    isProcessed.current = true;

    const accessToken = searchParams?.get('accessToken');
    const refreshToken = searchParams?.get('refreshToken');
    const error = searchParams?.get('error');

    if (error || !accessToken || !refreshToken) {
      console.error('[OAuthCallback] Error or Missing tokens:', error);
      router.replace('/login?error=social_login_failed');
      return;
    }

    mutation.mutate(
      { accessToken, refreshToken },
      {
        onSuccess: async (data) => {
          const storedCallbackUrl = sessionStorage.getItem(SOCIAL_CALLBACK_URL_KEY);
          sessionStorage.removeItem(SOCIAL_CALLBACK_URL_KEY);
          await queryClient.prefetchQuery({
            queryKey: favoriteKeys.count(),
            queryFn: () => favoritesApi.getCount(),
          });
          login(data.user);
          router.replace(getSafeCallbackUrl(storedCallbackUrl, '/home'));
        },
        onError: () => {
          router.replace('/login?error=session_error');
        },
      }
    );
    // 마운트 시 한 번만 실행 — searchParams는 URL에서 읽는 초기값이므로 재실행 불필요
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return mutation;
};
