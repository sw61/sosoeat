'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { TeamIdMeetingsGetRequest } from '@/shared/types/generated-client/apis/MeetingsApi';

import type { getMeetings } from '../index.server';

import { meetingsQueryOptions } from './meetings.options';

export const useSearchList = () => {
  return useQuery(meetingsQueryOptions.all());
};

export const useSearchOptions = (options: Omit<TeamIdMeetingsGetRequest, 'teamId'>) => {
  return useQuery(meetingsQueryOptions.options(options));
};

type MeetingsOptions = Omit<TeamIdMeetingsGetRequest, 'teamId' | 'region'> & {
  region?: string | string[];
};

//지역이 1개일때 사용
export const useSearchInfiniteOption = (
  options: MeetingsOptions,
  initialData?: Awaited<ReturnType<typeof getMeetings>>
) => {
  return useInfiniteQuery(
    meetingsQueryOptions.infiniteOptions(
      options as Omit<TeamIdMeetingsGetRequest, 'teamId'>,
      initialData
    )
  );
};
