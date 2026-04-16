'use client';

import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type { getMeetings } from '../index.server';

import type { MeetingSearchOptions, MeetingSearchRequest } from './meeting.types';
import { meetingsQueryOptions } from './meeting-search-query-options';

export const useSearchList = () => {
  return useQuery(meetingsQueryOptions.all());
};

export const useSearchOptions = (options: MeetingSearchRequest) => {
  return useQuery(meetingsQueryOptions.options(options));
};

export const useSearchInfiniteOption = (
  options: MeetingSearchOptions,
  initialData?: Awaited<ReturnType<typeof getMeetings>>,
  queryOptions?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    ...meetingsQueryOptions.infiniteOptions(options, initialData),
    placeholderData: keepPreviousData,
    enabled: queryOptions?.enabled ?? true,
  });
};
