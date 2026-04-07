import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationQueryOptions } from './notifications.options';

export const useNotificationReadActions = (notificationId?: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: mutate,
    isPending,
    isError,
  } = useMutation(notificationQueryOptions.matchAsRead(queryClient));
  const { mutate: mutateAll } = useMutation(notificationQueryOptions.matchAsReadAll(queryClient));

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
