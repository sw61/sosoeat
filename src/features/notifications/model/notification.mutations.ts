import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import type { Notification } from '@/shared/types/generated-client';

import { notificationApi } from '../api/notifications.api';

import { notificationKeys } from './notification.queries';

type NotificationPage = { data: Notification[]; nextCursor: string; hasMore: boolean };
type NotificationInfiniteData = InfiniteData<NotificationPage>;

const updateListCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (notification: Notification) => Notification | null
) => {
  queryClient.setQueriesData<NotificationInfiniteData>(
    { queryKey: notificationKeys.list() },
    (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        pages: prev.pages.map((page) => ({
          ...page,
          data: page.data.reduce<Notification[]>((acc, item) => {
            const next = updater(item);
            if (next !== null) acc.push(next);
            return acc;
          }, []),
        })),
      };
    }
  );
};

const decrementUnreadCount = (queryClient: ReturnType<typeof useQueryClient>, by = 1) => {
  queryClient.setQueryData<number>(notificationKeys.unreadCount(), (prev = 0) =>
    Math.max(0, prev - by)
  );
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.markAsRead(notificationId),
    onMutate: (notificationId) => {
      let wasUnread = false;
      updateListCache(queryClient, (item) => {
        if (item.id !== notificationId) return item;
        if (!item.isRead) wasUnread = true;
        return { ...item, isRead: true };
      });
      if (wasUnread) decrementUnreadCount(queryClient);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      void queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onMutate: () => {
      updateListCache(queryClient, (item) => ({ ...item, isRead: true }));
      queryClient.setQueryData<number>(notificationKeys.unreadCount(), 0);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      void queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.deleteNotification(notificationId),
    onMutate: (notificationId) => {
      let wasUnread = false;
      updateListCache(queryClient, (item) => {
        if (item.id !== notificationId) return item;
        if (!item.isRead) wasUnread = true;
        return null;
      });
      if (wasUnread) decrementUnreadCount(queryClient);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      void queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.deleteAllNotifications(),
    onMutate: () => {
      updateListCache(queryClient, () => null);
      queryClient.setQueryData<number>(notificationKeys.unreadCount(), 0);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      void queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
    },
  });
};
