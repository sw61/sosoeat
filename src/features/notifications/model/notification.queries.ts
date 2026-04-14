import { type QueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { TeamIdNotificationsGetRequest } from '@/shared/types/generated-client';

import { notificationApi } from '../api/notifications.api';

export const notificationKeys = {
  list: (options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>) =>
    options ? (['notifications', 'list', options] as const) : (['notifications', 'list'] as const),
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;

const getNotificationInfiniteQueryOptions = (
  options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>
) => ({
  queryKey: notificationKeys.list(options),
  queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
    notificationApi.getNotificationOption(
      options ? { ...options, cursor: pageParam } : { cursor: pageParam }
    ),
  getNextPageParam: (lastPage: { hasMore: boolean; nextCursor: string }) =>
    lastPage.hasMore ? lastPage.nextCursor : undefined,
  initialPageParam: undefined as string | undefined,
});

export const useNotificationInfiniteList = (
  options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>
) =>
  useInfiniteQuery({
    ...getNotificationInfiniteQueryOptions(options),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

export const prefetchNotificationInfiniteList = (
  queryClient: QueryClient,
  options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>
) =>
  queryClient.prefetchInfiniteQuery({
    ...getNotificationInfiniteQueryOptions(options),
    pages: 1,
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
