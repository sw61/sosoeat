'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useSignUpMutation } from '@/entities/auth';
import { SignupRequest } from '@/shared/types/generated-client/models';

export const useSignUp = () => {
  const router = useRouter();
  const { mutateAsync: signUpMutate, isPending } = useSignUpMutation();

  const mutateAsync = async (payload: SignupRequest) => {
    await signUpMutate(payload);
    toast.success('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
    router.push('/login');
  };

  return { mutateAsync, isPending };
};
