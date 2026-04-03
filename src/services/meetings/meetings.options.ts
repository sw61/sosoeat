import { MeetingList, TeamIdMeetingsGetRequest } from '@/types/generated-client';

import { meetingsApi } from './meetings.api';

export const meetingsQueryOptions = {
  all: () => ({
    queryKey: ['meetings'],
    queryFn: () => meetingsApi.getList(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  }),
  detail: (id: number) => ({
    queryKey: ['meetings', 'detail', id],
    queryFn: async () => meetingsApi.getById(id),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  }),
  options: (options: Omit<TeamIdMeetingsGetRequest, 'teamId'>) => ({
    queryKey: [
      'meetings',
      {
        ...options,
      },
    ],
    queryFn: () => meetingsApi.getByFilter(options),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  }),
  infiniteOptions: (options: Omit<TeamIdMeetingsGetRequest, 'teamId'>) => ({
    queryKey: [
      'meetings',
      {
        ...options,
      },
    ],
    initialPageParam: options.cursor,
    queryFn: async ({ pageParam }: { pageParam?: string }) =>
      meetingsApi.getByFilter({
        ...options,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof meetingsApi.getByFilter>>) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  }),
};
