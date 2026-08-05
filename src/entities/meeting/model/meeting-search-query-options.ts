import { meetingsApi } from '../api/meetings.api';

export const meetingsQueryOptions = {
  meetingDetail: (id: number) => ({
    queryKey: ['meetings', 'detail', id] as const,
    queryFn: () => meetingsApi.getById(id),
    staleTime: 60_000,
  }),
};
