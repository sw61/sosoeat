import { useMarkAllAsRead, useMarkAsRead } from './notification.queries';

export const useNotificationReadActions = (notificationId?: number) => {
  const { mutate: mutate } = useMarkAsRead();
  const { mutate: mutateAll } = useMarkAllAsRead();
  const markAsRead = () => {
    if (notificationId == null) {
      return false;
    }
    mutate(notificationId);
    return;
  };

  const markAllAsRead = () => {
    mutateAll();
  };

  return {
    markAsRead,
    markAllAsRead,
  };
};
