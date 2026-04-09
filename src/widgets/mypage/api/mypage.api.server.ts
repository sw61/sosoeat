import { apiServer } from '@/shared/api/api-server';
import { FavoriteCount, User, UserMeetingsResponse } from '@/shared/types/generated-client';

export const fetchMeServer = async (): Promise<User | null> => {
  const res = await apiServer.get('/users/me', { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
};

const MAX_MEETING_FETCH_SIZE = 9999;

export const fetchMeetingCountServer = async (): Promise<number> => {
  const res = await apiServer.get(`/users/me/meetings?size=${MAX_MEETING_FETCH_SIZE}`, {
    cache: 'no-store',
  });
  if (!res.ok) return 0;
  const data: UserMeetingsResponse = await res.json();
  return data.data.length;
};

export const fetchFavoriteCountServer = async (): Promise<number> => {
  const res = await apiServer.get('/favorites/count', { cache: 'no-store' });
  if (!res.ok) return 0;
  const data: FavoriteCount = await res.json();
  return data.count;
};

export const fetchPostCountServer = async (): Promise<number> => {
  const res = await apiServer.get('/users/me/posts', { cache: 'no-store' });
  if (!res.ok) return 0;
  const data = await res.json();
  return data.data?.length ?? 0;
};
