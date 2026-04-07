import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationQueryOptions } from './notifications.options';

export const useNotificationReadActions = (notificationId?: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(notificationQueryOptions.matchAsRead(queryClient));
  const mutationAll = useMutation(notificationQueryOptions.matchAsReadAll(queryClient));

  const markAsRead = () => {
    try {
      if (notificationId == null) {
        return false;
      }
      mutation.mutateAsync(notificationId);
      return;
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      return false;
    }
  };

  const markAllAsRead = () => {
    try {
      mutationAll.mutateAsync();

      return;
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
