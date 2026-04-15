import { fetchClient } from '@/shared/api/fetch-client';
import { FavoriteList, UserMeeting, UserMeetingsResponse } from '@/shared/types/generated-client';

export type UserMeetingWithImage = UserMeeting & {
  image?: string;
  type?: string;
  confirmedAt?: string | null;
};
export type UserMeetingsResponseWithImage = Omit<UserMeetingsResponse, 'data'> & {
  data: UserMeetingWithImage[];
};

export const mypageApi = {
  fetchJoinedMeetings: async (cursor?: string): Promise<UserMeetingsResponseWithImage> => {
    const url = cursor
      ? `/users/me/meetings?type=joined&cursor=${encodeURIComponent(cursor)}`
      : '/users/me/meetings?type=joined';
    const res = await fetchClient.get(url);
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },

  fetchCreatedMeetings: async (cursor?: string): Promise<UserMeetingsResponseWithImage> => {
    const url = cursor
      ? `/users/me/meetings?type=created&cursor=${encodeURIComponent(cursor)}`
      : '/users/me/meetings?type=created';
    const res = await fetchClient.get(url);
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },

  fetchFavoriteMeetings: async (): Promise<FavoriteList> => {
    const res = await fetchClient.get('/favorites');
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },
};
