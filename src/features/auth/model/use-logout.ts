'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuthStore, useLogoutMutation } from '@/entities/auth';
import { favoriteKeys } from '@/entities/favorites';

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { mutateAsync: logoutMutate, isPending } = useLogoutMutation();
  const queryClient = useQueryClient();

  const mutate = async () => {
    await logoutMutate();
    logout();
    queryClient.setQueryData(favoriteKeys.count(), 0);
    toast.success('로그아웃 되었습니다.');
    router.push('/home');
  };

  return { mutate, isPending };
};
