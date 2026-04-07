import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth';
import { User } from '@/shared/types/generated-client';

import { profileEditApi } from '../api/profile-edit.api';

export function useUpdateProfile(options?: { onSuccess?: (data: User) => void }) {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: profileEditApi.patchMe,
    onSuccess: (data) => {
      login({
        id: data.id,
        email: data.email,
        name: data.name,
        teamId: data.teamId,
        companyName: data.companyName,
        image: data.image,
      });
      options?.onSuccess?.(data);
    },
  });
}
