import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationApi } from '../api/notifications.api';

import { notificationKeys } from './notification.queries';

const invalidateNotifications = (queryClient: ReturnType<typeof useQueryClient>) =>
  Promise.all([
    queryClient.invalidateQueries({ queryKey: notificationKeys.list() }),
    queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() }),
  ]);

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.markAsRead(notificationId),
    onSuccess: () => invalidateNotifications(queryClient),
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => invalidateNotifications(queryClient),
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.deleteNotification(notificationId),
    onSuccess: () => invalidateNotifications(queryClient),
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.deleteAllNotifications(),
    onSuccess: () => invalidateNotifications(queryClient),
  });
};
