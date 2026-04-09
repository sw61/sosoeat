'use client';

import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth';
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
  });
};
