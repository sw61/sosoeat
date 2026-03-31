import { fetchClient } from '@/lib/http/fetch-client';
import { TeamIdMeetingsGetRequest } from '@/types/generated-client';

import { makeQueryString } from '../../services/meeting-page.services';

export const fetchMeetingByFilter = async (filter: Omit<TeamIdMeetingsGetRequest, 'teamId'>) => {
  const data = await fetchClient.get(`/meetings${makeQueryString(filter)}`);
  return data.json();
};
