import { QueryClient } from '@tanstack/react-query';

import { notificationApi } from '../api/notifications.api';

export const notificationQueryOptions = {
  list: {
    queryKey: ['notifications'],
    queryFn: notificationApi.getNotificationList,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  },
  unreadCount: {
    queryKey: ['notifications', 'unreadCount'],
    queryFn: notificationApi.getUnreadCount,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  },
  optionalList: (options: { isRead?: boolean; cursor?: string; size?: number }) => ({
    queryKey: ['notifications', { ...options }],
    queryFn: () => notificationApi.getNotificationOption(options),
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  }),
  matchAsRead: (queryClient: QueryClient) => ({
    mutationKey: ['notifications', 'read'],
    mutationFn: (notificationId: number) => notificationApi.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  }),
  matchAsReadAll: (queryClient: QueryClient) => ({
    mutationKey: ['notifications', 'readAll'],
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
    },
  }),
};
