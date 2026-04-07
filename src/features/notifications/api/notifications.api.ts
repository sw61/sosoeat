import { fetchClient } from '@/shared/api/fetch-client';
import { Notification } from '@/shared/types/generated-client';

export const notificationApi = {
  getNotificationOption: async (options: { isRead?: boolean; cursor?: string; size?: number }) => {
    const params = new URLSearchParams();
    if (options.isRead !== undefined) params.append('isRead', String(options.isRead));
    if (options.cursor) params.append('cursor', options.cursor);
    if (options.size) params.append('size', String(options.size));

    const response = await fetchClient.get(
      `/notifications?isRead=${options.isRead}&size=${options.size}${options.cursor ? `&cursor=${options.cursor}` : ''}`
    );
    const data = await response.json();
    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

    return items.map((item: Notification) => ({
      ...item,
      createdAt: new Date(item.createdAt as unknown as string),
    }));
  },
  getNotificationList: async () => {
    const response = await fetchClient.get('/notifications');
    const data = await response.json();

    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

    return items.map((item: Notification) => ({
      ...item,
      createdAt: new Date(item.createdAt as unknown as string),
    }));
  },
  getUnreadCount: async () => {
    const response = await fetchClient.get('/notifications/unread-count');
    const data = await response.json();

    return typeof data?.count === 'number' ? data.count : 0;
  },
  markAsRead: async (notificationId: number) => {
    const response = await fetchClient.put(`/notifications/${notificationId}/read`);
    return response;
  },
  markAllAsRead: async () => {
    const response = await fetchClient.put('/notifications/read-all');
    return response;
  },
};
