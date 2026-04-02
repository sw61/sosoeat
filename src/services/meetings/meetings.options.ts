import { meetingsApi } from './meetings.api';

export const meetingsQueryOptions = {
  all: () => ({
    queryKey: ['meetings'],
    queryFn: meetingsApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 10, // 10분
  }),
  detail: (id: number) => ({
    queryKey: ['meetings', id],
    queryFn: () => {
      const response = meetingsApi.getAll();
      const meeting = response.then((meetings) => meetings.find((m) => m.id === id));
      if (!meeting) {
        throw new Error('모임을 찾을 수 없습니다.');
      }
      return meeting;
    },
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 10, // 10분
  }),
};
