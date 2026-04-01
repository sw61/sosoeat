import { TeamIdMeetingsGetRequest } from '@/types/generated-client';

export const makeQueryString = (params: Omit<TeamIdMeetingsGetRequest, 'teamId'>): string => {
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return q ? `?${q}` : '';
};
