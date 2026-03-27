import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuthStore } from '@/store/auth-store';
import { LoginRequest, SignupRequest } from '@/types/generated-client/models';

import { authApi } from './auth.api';

/**
 * [Hook] useLogin
 * 로그인을 위한 Mutation 훅입니다. 성공 시 전역 상태를 업데이트하고 홈으로 이동합니다.
 */
export const useLogin = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      login(data.user);
      toast.success('로그인에 성공했습니다.');
      router.push('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || '로그인 중 오류가 발생했습니다.');
    },
  });
};

/**
 * [Hook] useSignUp
 * 회원가입을 위한 Mutation 훅입니다.
 */
export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: SignupRequest) => authApi.signUp(payload),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.push('/login');
    },
    // 에러 처리는 mutateAsync를 사용하는 쪽(handleNameNext)에서 담당
  });
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
    onError: (error: Error) => {
      toast.error(error.message || '로그아웃 중 오류가 발생했습니다.');
    },
  });
};
