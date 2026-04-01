import { fetchClient } from '@/lib/http/fetch-client';
import {
  FavoriteList,
  UpdateUserRequest,
  User,
  UserMeetingsResponse,
} from '@/types/generated-client';

export const mypageRepository = {
  patchMe: async (body: UpdateUserRequest): Promise<User | null> => {
    const res = await fetchClient.patch('/users/me', body);
    if (!res.ok) return null;
    return res.json();
  },

  fetchJoinedMeetings: async (): Promise<UserMeetingsResponse> => {
    const res = await fetchClient.get('/users/me/meetings?type=joined');
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },

  fetchCreatedMeetings: async (): Promise<UserMeetingsResponse> => {
    const res = await fetchClient.get('/users/me/meetings?type=created');
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },

  fetchFavoriteMeetings: async (): Promise<FavoriteList> => {
    const res = await fetchClient.get('/favorites');
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },
};
