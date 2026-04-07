import { fetchClient } from '@/shared/api/fetch-client';
import { UpdateUserRequest, User } from '@/shared/types/generated-client';

export const profileEditApi = {
  patchMe: async (body: UpdateUserRequest): Promise<User> => {
    const res = await fetchClient.patch('/users/me', body);
    if (!res.ok) throw new Error('프로필 업데이트에 실패했습니다.');
    return res.json();
  },
};
