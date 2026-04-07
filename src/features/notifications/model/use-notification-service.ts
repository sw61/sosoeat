import { useQuery } from '@tanstack/react-query';

import { notificationQueryOptions } from './notifications.options';

export const useNotificationService = () => {
  const {
    isLoading,
    error,
    data: notifications,
    isPending,
  } = useQuery(notificationQueryOptions.list);
  const { data: unreadCountData } = useQuery(notificationQueryOptions.unreadCount);

  const list = Array.isArray(notifications)
    ? notifications
    : Array.isArray(notifications?.data)
      ? notifications.data
      : [];

  return {
    unreadCount: unreadCountData ?? 0,
    list,
    isLoading,
    isPending,
    error,
  };
};
