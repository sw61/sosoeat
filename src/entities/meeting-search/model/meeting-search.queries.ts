'use client';

import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type { MeetingListResult } from '@/entities/meeting';

import type { MeetingSearchOptions, MeetingSearchRequest } from './meeting-search.types';
import { meetingSearchQueryOptions } from './meeting-search-query-options';

export const useSearchList = () => {
  return useQuery(meetingSearchQueryOptions.all());
};

export const useSearchOptions = (options: MeetingSearchRequest) => {
  return useQuery(meetingSearchQueryOptions.options(options));
};

export const useSearchInfiniteOption = (
  options: MeetingSearchOptions,
  initialData?: MeetingListResult,
  queryOptions?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    ...meetingSearchQueryOptions.infiniteOptions(options, initialData),
    placeholderData: keepPreviousData,
    enabled: queryOptions?.enabled ?? true,
  });
};
