import { fetchClient } from '@/shared/api/fetch-client';
import { TeamIdMeetingsGetRequest } from '@/shared/types/generated-client';
import { makeQueryString } from '@/widgets/search/model/meeting-page.services';

export const fetchMeetingByFilter = async (filter: Omit<TeamIdMeetingsGetRequest, 'teamId'>) => {
  const data = await fetchClient.get(`/meetings${makeQueryString(filter)}`);
  return data.json();
};
