import { TeamIdMeetingsGetRequest } from '@/types/generated-client';

import { makeQueryString } from '../../services/meeting-page.services';

export const fetchMeetingByFilter = async (filter: TeamIdMeetingsGetRequest) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/meetings${makeQueryString(filter)}`
  );
  console.log('fetching with options:', filter);
  return data.json();
};
