import { fetchClient } from '@/shared/api/fetch-client';

export const notificationApi = {
  getNotificationOption: async (options: { isRead?: boolean; cursor?: string; size?: number }) => {
    const response = await fetchClient.get(
      `/notifications?isRead=${options.isRead}&size=${options.size}${options.cursor ? `&cursor=${options.cursor}` : ''}`
    );
    const params = new URLSearchParams();
    if (options.isRead !== undefined) params.append('isRead', String(options.isRead));
    if (options.cursor) params.append('cursor', options.cursor);
    if (options.size) params.append('size', String(options.size));

    return response;
  },
  getNotificationList: async () => {
    const response = await fetchClient.get('/notifications');
    return response;
  },
  getUnreadCount: async () => {
    const response = await fetchClient.get('/notifications/unread-count');
    return response;
  },
  markAsRead: async (notificationId: number) => {
    const response = await fetchClient.post(`/notifications/${notificationId}/read`);
    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
    return response.ok;
  },
  markAllAsRead: async () => {
    const response = await fetchClient.post('/notifications/read-all');
    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }
    return response.ok;
  },
};
