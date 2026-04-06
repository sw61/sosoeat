import { useMutation } from '@tanstack/react-query';

import { LoginRequest, SignupRequest } from '@/shared/types/generated-client/models';

import { authApi } from '../api/auth.api';

/**
 * [Entity] useLoginMutation
 * 로그인 API 호출만 담당합니다. 성공/실패 처리는 호출 측에서 담당합니다.
 */
export const useLoginMutation = () =>
  useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
  });

/**
 * [Entity] useSignUpMutation
 * 회원가입 API 호출만 담당합니다. 성공/실패 처리는 호출 측에서 담당합니다.
 */
export const useSignUpMutation = () =>
  useMutation({
    mutationFn: (payload: SignupRequest) => authApi.signUp(payload),
  });

/**
 * [Entity] useSocialLoginMutation
 * 소셜 로그인 콜백 API 호출만 담당합니다. 성공/실패 처리는 호출 측에서 담당합니다.
 */
export const useSocialLoginMutation = () =>
  useMutation({
    mutationFn: (payload: { accessToken: string; refreshToken: string }) =>
      authApi.socialCallback(payload),
  });

/**
 * [Entity] useLogoutMutation
 * 로그아웃 API 호출만 담당합니다. 성공/실패 처리는 호출 측에서 담당합니다.
 */
export const useLogoutMutation = () =>
  useMutation({
    mutationFn: () => authApi.logout(),
  });
