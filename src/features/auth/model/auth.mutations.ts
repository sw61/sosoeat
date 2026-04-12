'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authApi, useAuthStore } from '@/entities/auth';
import { STORAGE_KEYS } from '@/shared/lib/storage-keys';
import type { LoginRequest, SignupRequest } from '@/shared/types/generated-client/models';
import { getSafeCallbackUrl } from '@/shared/utils/url';

/**
 * [Feature] useLoginMutation
 * 로그인 API 호출 + 성공/실패 처리 (캐시 초기화, 라우팅, 상태 관리)
 */
export const useLoginMutation = (callbackUrl?: string | null) => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      login(data.user);
      toast.success('로그인에 성공했습니다.');
      router.push(getSafeCallbackUrl(callbackUrl, '/home'));
    },
  });
};

/**
 * [Feature] useCheckEmailDuplicateMutation
 * 이메일 중복 확인 API 호출만 담당합니다. 성공/실패 처리는 호출 측에서 담당합니다.
 */
export const useCheckEmailDuplicateMutation = () =>
  useMutation({
    mutationFn: (email: string) => authApi.checkEmailDuplicate(email),
  });

/**
 * [Feature] useSignUpMutation
 * 회원가입 API 호출 + 성공/실패 처리 (라우팅, 토스트)
 */
export const useSignUpMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: SignupRequest) => authApi.signUp(payload),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    },
  });
};

/**
 * [Feature] useSocialLoginMutation
 * 소셜 로그인 콜백 API 호출 + 성공/실패 처리 (캐시 초기화, 라우팅, 상태 관리)
 */
export const useSocialLoginMutation = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: { accessToken: string; refreshToken: string }) =>
      authApi.socialCallback(payload),
    onSuccess: (data) => {
      login(data.user);
      const storedCallbackUrl = sessionStorage.getItem(STORAGE_KEYS.SOCIAL_LOGIN_CALLBACK_URL);
      router.replace(getSafeCallbackUrl(storedCallbackUrl, '/home'));
    },
    onError: () => {
      router.replace('/login?error=session_error');
    },
    onSettled: () => {
      sessionStorage.removeItem(STORAGE_KEYS.SOCIAL_LOGIN_CALLBACK_URL);
    },
  });
};

/**
 * [Feature] useLogoutMutation
 * 로그아웃 API 호출 + 성공/실패 처리 (캐시 초기화, 라우팅, 상태 관리)
 */
export const useLogoutMutation = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (redirectUrl?: string) => authApi.logout().then(() => redirectUrl ?? '/home'),
    onSuccess: (redirectUrl) => {
      logout();
      queryClient.clear();
      router.push(redirectUrl);
    },
  });
};
