import { useNotificationList, useUnreadCount } from './notification.queries';

export const useNotificationService = () => {
  const { isLoading, error, data: notifications, isPending } = useNotificationList();
  const { data: unreadCountData } = useUnreadCount();

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
