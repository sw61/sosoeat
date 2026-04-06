'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { useAuthStore, useLogoutMutation } from '@/entities/auth';

export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { mutateAsync: logoutMutate, isPending } = useLogoutMutation();

  const mutate = async () => {
    await logoutMutate();
    logout();
    toast.success('로그아웃 되었습니다.');
    router.push('/');
  };

  return { mutate, isPending };
};
