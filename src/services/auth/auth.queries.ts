import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuthStore } from '@/store/auth-store';
import { LoginRequest, SignupRequest } from '@/types/generated-client/models';
import { getSafeCallbackUrl, SOCIAL_CALLBACK_URL_KEY } from '@/utils/url';

import { authApi } from './auth.api';

/**
 * [Hook] useLogin
 * 로그인을 위한 Mutation 훅입니다. 성공 시 전역 상태를 업데이트하고 홈으로 이동합니다.
 * callbackUrl 쿼리 파라미터가 있으면 로그인 후 해당 경로로 이동합니다.
 */
export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      login(data.user);
      toast.success('로그인에 성공했습니다.');
      router.push(getSafeCallbackUrl(searchParams.get('callbackUrl')));
    },
    onError: (error: Error) => {
      toast.error(error.message || '로그인 중 오류가 발생했습니다.');
    },
  });
};

/**
 * [Hook] useSignUp
 * 회원가입을 위한 Mutation 훅입니다.
 * onError를 정의하지 않아 mutateAsync 호출 시 에러가 re-throw됩니다.
 * 에러 처리는 mutateAsync를 사용하는 useSignupForm의 handleNameNext에서 담당합니다.
 */
export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: SignupRequest) => authApi.signUp(payload),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.push('/login');
    },
  });
};

/**
 * [Hook] useSocialLogin
 * 소셜 로그인 OAuth 콜백을 처리하는 훅입니다.
 * URL 쿼리 파라미터에서 토큰을 추출하여 BFF 세션을 설정하고 홈으로 이동합니다.
 */
export const useSocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  // BFF 중복 호출 방지: 의존성 변경으로 useEffect가 재실행되어도 한 번만 실행
  const isProcessed = useRef(false);

  useEffect(() => {
    if (isProcessed.current) return;
    isProcessed.current = true;

    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const error = searchParams.get('error');

    if (error || !accessToken || !refreshToken) {
      console.error('[OAuthCallback] Error or Missing tokens:', error);
      router.replace('/login?error=social_login_failed');
      return;
    }

    const storedCallbackUrl = sessionStorage.getItem(SOCIAL_CALLBACK_URL_KEY);
    const callbackUrl = getSafeCallbackUrl(storedCallbackUrl);

    authApi
      .socialCallback({ accessToken, refreshToken })
      .then((data) => {
        sessionStorage.removeItem(SOCIAL_CALLBACK_URL_KEY);
        login(data.user);
        router.replace(callbackUrl);
      })
      .catch(() => {
        router.replace('/login?error=session_error');
      });
  }, [searchParams, login, router]);
};

/**
 * [Hook] useLogout
 * 로그아웃을 위한 Mutation 훅입니다.
 */
export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout(); // Zustand 상태 초기화
      toast.success('로그아웃 되었습니다.');
      router.push('/');
    },
  });
};
