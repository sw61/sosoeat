'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import { useAuthStore, useLoginMutation } from '@/entities/auth';
import { LoginRequest } from '@/shared/types/generated-client/models';
import { getSafeCallbackUrl } from '@/shared/utils/url';

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const { mutateAsync: loginMutate, isPending } = useLoginMutation();

  const mutateAsync = async (payload: LoginRequest) => {
    const data = await loginMutate(payload);
    login(data.user);
    toast.success('로그인에 성공했습니다.');
    router.push(getSafeCallbackUrl(searchParams?.get('callbackUrl')));
    return data;
  };

  return { mutateAsync, isPending };
};
