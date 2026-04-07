import { notificationApi, notificationRepository } from '../api';

export const useNotificationReadActions = (notificationId?: number) => {
  const markAsRead = async () => {
    try {
      if (notificationId == null) {
        return false;
      }

      return await notificationRepository.readNotification({ notificationId });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      return false;
    }
  };

  const markAllAsRead = async () => {
    try {
      return await notificationApi.markAllAsRead();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      return false;
    }
  };

  return {
    markAsRead,
    markAllAsRead,
  };
};
