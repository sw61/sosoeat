import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { TeamIdMeetingsGetRequest } from '@/shared/types/generated-client/apis/MeetingsApi';

import { meetingsQueryOptions } from './meetings.options';

export const useSearchList = () => {
  return useQuery(meetingsQueryOptions.all());
};

export const useSearchOptions = (options: Omit<TeamIdMeetingsGetRequest, 'teamId'>) => {
  return useQuery(meetingsQueryOptions.options(options));
};

export const useSearchInfiniteOptions = (options: Omit<TeamIdMeetingsGetRequest, 'teamId'>) => {
  return useInfiniteQuery(meetingsQueryOptions.infiniteOptions(options));
};
