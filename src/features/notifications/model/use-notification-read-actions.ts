import {
  useDeleteAllNotifications,
  useDeleteNotification,
  useMarkAllAsRead,
  useMarkAsRead,
} from './notification.mutations';

export const useNotificationReadActions = (notificationId?: number, isRead?: boolean) => {
  const { mutate } = useMarkAsRead();
  const { mutate: mutateAll } = useMarkAllAsRead();
  const { mutate: mutateDelete } = useDeleteNotification();
  const { mutate: mutateDeleteAll } = useDeleteAllNotifications();

  const markAsRead = () => {
    if (notificationId == null || isRead) return;
    mutate(notificationId);
  };

  const markAllAsRead = () => {
    mutateAll();
  };

  const deleteNotification = () => {
    if (notificationId == null) return;
    mutateDelete(notificationId);
  };

  const deleteAllNotifications = () => {
    mutateDeleteAll();
  };

  return {
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  };
};
