//notification.queries.ts
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TeamIdNotificationsGetRequest } from '@/shared/types/generated-client';

import { notificationApi } from '../api/notifications.api';

// Query Key Factory
export const notificationKeys = {
  list: (options?: Omit<TeamIdNotificationsGetRequest, 'teamId'>) =>
    options ? (['notifications', 'list', options] as const) : (['notifications', 'list'] as const),
  unreadCount: () => ['notifications', 'unread-count'] as const,
} as const;

// useQuery
export const useNotificationList = () =>
  useQuery({
    queryKey: notificationKeys.list(),
    queryFn: notificationApi.getNotificationList,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
export const useNotificationListWithOptions = (
  options: Omit<TeamIdNotificationsGetRequest, 'teamId'>
) =>
  useQuery({
    queryKey: notificationKeys.list(options),
    queryFn: () => notificationApi.getNotificationOption(options),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

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

export const useUnreadCount = () =>
  useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: notificationApi.getUnreadCount,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

// useMutation
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};
