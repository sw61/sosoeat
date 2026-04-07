//notification.queries.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { notificationApi } from '../api/notifications.api';

type NotificationListOptions = {
  isRead?: boolean;
  cursor?: string;
  size?: number;
};

// Query Key Factory
export const notificationKeys = {
  list: (options?: NotificationListOptions) => ['notifications', 'list', options] as const,
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
export const useNotificationListWithOptions = (options: NotificationListOptions) =>
  useQuery({
    queryKey: notificationKeys.list(options),
    queryFn: () => notificationApi.getNotificationOption(options),
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
