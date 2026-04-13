import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { TeamIdNotificationsGetRequest } from '@/shared/types/generated-client';

import { notificationApi } from '../api/notifications.api';

export const notificationKeys = {
  list: (options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>) =>
    options ? (['notifications', 'list', options] as const) : (['notifications', 'list'] as const),
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;

export const useNotificationInfiniteList = (
  options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>
) =>
  useInfiniteQuery({
    queryKey: notificationKeys.list(options),
    queryFn: ({ pageParam }) =>
      notificationApi.getNotificationOption(
        options ? { ...options, cursor: pageParam } : { cursor: pageParam }
      ),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: undefined as string | undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

const MODULE_LOAD_TIME = Date.now();

export const useUnreadCount = (initialCount = 0) =>
  useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: notificationApi.getUnreadCount,
    initialData: initialCount,
    initialDataUpdatedAt: MODULE_LOAD_TIME,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
