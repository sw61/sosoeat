import type { Notification } from '@/shared/types/generated-client';

import { notificationApi } from '../api/notifications.api';

export const notificationQueryOptions = {
  list: {
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await notificationApi.getNotificationList();
      const data = await response.json();

      const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

      return items.map((item: Notification) => ({
        ...item,
        createdAt: new Date(item.createdAt as unknown as string),
      }));
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  },
  unreadCount: {
    queryKey: ['notifications', 'unreadCount'],
    queryFn: async () => {
      const response = await notificationApi.getUnreadCount();
      const data = await response.json();

      return typeof data?.count === 'number' ? data.count : 0;
    },
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  },
  optionalList: (options: { isRead?: boolean; cursor?: string; size?: number }) => ({
    queryKey: ['notifications', { ...options }],
    queryFn: async () => {
      const response = await notificationApi.getNotificationOption(options);
      const data = await response.json();

      const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

      return items.map((item: Notification) => ({
        ...item,
        createdAt: new Date(item.createdAt as unknown as string),
      }));
    },
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  }),
};
