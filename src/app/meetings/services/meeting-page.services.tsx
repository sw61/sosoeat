import qs from 'qs';

import { TeamIdMeetingsGetRequest } from '@/types/generated-client';

export const makeQueryString = (params: Omit<TeamIdMeetingsGetRequest, 'teamId'>): string => {
  return qs.stringify(params, {
    skipNulls: true,
    addQueryPrefix: true,
    serializeDate: (date: Date) => date.toISOString(),
  });
};
