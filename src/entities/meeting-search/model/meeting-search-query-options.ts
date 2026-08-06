import type { MeetingListResult } from '@/entities/meeting';

import { meetingSearchApi } from '../api/meeting-search.api';

import type { MeetingSearchRequest } from './meeting-search.types';

const searchKeys = {
  all: () => ['search'] as const,
  options: (options: MeetingSearchRequest) => ['search', 'list', options] as const,
  infiniteOptions: (options: MeetingSearchRequest) => ['search', 'infinite-list', options] as const,
} as const;

export const meetingSearchQueryOptions = {
  all: () => ({
    queryKey: searchKeys.all(),
    queryFn: () => meetingSearchApi.getList(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  }),
  options: (options: MeetingSearchRequest) => ({
    queryKey: searchKeys.options(options),
    queryFn: () => meetingSearchApi.getByFilter(options),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  }),
  infiniteOptions: (options: MeetingSearchRequest, initialData?: MeetingListResult) => ({
    queryKey: searchKeys.infiniteOptions(options),
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      meetingSearchApi.getByFilter({ ...options, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: MeetingListResult) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    initialData: initialData ? { pages: [initialData], pageParams: [undefined] } : undefined,
  }),
};
