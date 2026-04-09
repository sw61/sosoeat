'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuthStore, useLoginMutation } from '@/entities/auth';
import { favoriteKeys, favoritesApi } from '@/entities/favorites';
import { LoginRequest } from '@/shared/types/generated-client/models';
import { getSafeCallbackUrl } from '@/shared/utils/url';

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const { mutateAsync: loginMutate, isPending } = useLoginMutation();
  const queryClient = useQueryClient();

  const mutateAsync = async (payload: LoginRequest) => {
    const data = await loginMutate(payload);
    await queryClient.prefetchQuery({
      queryKey: favoriteKeys.count(),
      queryFn: () => favoritesApi.getCount(),
    });
    login(data.user);
    toast.success('로그인에 성공했습니다.');
    router.push(getSafeCallbackUrl(searchParams?.get('callbackUrl'), '/home'));
    return data;
  };

  return { mutateAsync, isPending };
};
