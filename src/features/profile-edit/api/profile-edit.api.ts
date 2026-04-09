import { fetchClient } from '@/shared/api/fetch-client';
import type { UpdateUserRequest, User } from '@/shared/types/generated-client';

export const patchMe = async (body: UpdateUserRequest): Promise<User | null> => {
  const res = await fetchClient.patch('/users/me', body);
  if (!res.ok) return null;
  return res.json();
};
