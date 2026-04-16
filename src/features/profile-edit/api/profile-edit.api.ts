import * as Sentry from '@sentry/nextjs';

import { fetchClient } from '@/shared/api/fetch-client';
import type { UpdateUserRequest, User } from '@/shared/types/generated-client';

export const patchMe = async (body: UpdateUserRequest): Promise<User> => {
  try {
    const res = await fetchClient.patch('/users/me', body);

    if (!res.ok) {
      throw new Error('프로필 수정에 실패했습니다.');
    }

    return res.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: { feature: 'profile-edit', api: 'patchMe' },
      extra: { body },
    });
    throw error;
  }
};
