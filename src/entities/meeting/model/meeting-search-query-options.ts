import { meetingsApi } from '../api/meetings.api';
import type { getMeetings } from '../index.server';

import type { MeetingListResult, MeetingSearchRequest } from './meeting.types';

const searchKeys = {
  all: () => ['search'] as const,
  detail: (id: number) => ['search', 'detail', id] as const,
  options: (options: MeetingSearchRequest) => ['search', 'list', options] as const,
  infiniteOptions: (options: MeetingSearchRequest) => ['search', 'infinite-list', options] as const,
} as const;

export const meetingsQueryOptions = {
  meetingDetail: (id: number) => ({
    queryKey: ['meetings', 'detail', id] as const,
    queryFn: () => meetingsApi.getById(id),
    staleTime: 60_000,
  }),
  all: () => ({
    queryKey: searchKeys.all(),
    queryFn: () => meetingsApi.getList(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  }),
  detail: (id: number) => ({
    queryKey: searchKeys.detail(id),
    queryFn: async () => meetingsApi.getById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  }),
  options: (options: MeetingSearchRequest) => ({
    queryKey: searchKeys.options(options),
    queryFn: () => meetingsApi.getByFilter(options),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  }),
  infiniteOptions: (
    options: MeetingSearchRequest,
    initialData?: Awaited<ReturnType<typeof getMeetings>>
  ) => ({
    queryKey: searchKeys.infiniteOptions(options),
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      meetingsApi.getByFilter({ ...options, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: MeetingListResult) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    initialData: initialData ? { pages: [initialData], pageParams: [undefined] } : undefined,
  }),
};
