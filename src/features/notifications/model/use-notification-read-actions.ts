import { useMarkAllAsRead, useMarkAsRead } from './notification.quries';

export const useNotificationReadActions = (notificationId?: number) => {
  const { mutate: mutate, isPending, isError } = useMarkAsRead();
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
