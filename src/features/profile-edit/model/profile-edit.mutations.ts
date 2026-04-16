'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuthStore } from '@/entities/auth';
import { capture5xxException } from '@/shared/lib/sentry-error';
import type { User } from '@/shared/types/generated-client';

import { patchMe } from '../api/profile-edit.api';

export const useUpdateProfile = (onSuccess?: (user: User) => void) => {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: patchMe,
    onSuccess: (data) => {
      if (!data) return;
      login({
        id: data.id,
        email: data.email,
        name: data.name,
        teamId: data.teamId,
        companyName: data.companyName,
        image: data.image,
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      capture5xxException(error, {
        tags: {
          area: 'profile-edit',
          action: 'update-profile',
        },
      });
      toast.error('프로필 수정 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
  });
};
