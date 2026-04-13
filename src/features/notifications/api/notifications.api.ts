import { fetchClient } from '@/shared/api/fetch-client';
import {
  Notification,
  NotificationList,
  TeamIdNotificationsGetRequest,
} from '@/shared/types/generated-client';

export const notificationApi = {
  getNotificationOption: async (options: Omit<TeamIdNotificationsGetRequest, 'teamId'>) => {
    const params = new URLSearchParams();
    if (options.isRead !== undefined) params.append('isRead', String(options.isRead));
    if (options.cursor) params.append('cursor', options.cursor);
    if (options.size) params.append('size', String(options.size));

    const response = await fetchClient.get(`/notifications?${params.toString()}`);
    const data: NotificationList = await response.json();

    const items = data.data.map((item: Notification) => ({
      ...item,
      createdAt: new Date(item.createdAt as unknown as string),
    }));

    return { ...data, data: items };
  },
  getNotificationList: async () => {
    const response = await fetchClient.get('/notifications');
    const data: NotificationList = await response.json();

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
    if (!response.ok) {
      throw new Error(`Failed to mark notification ${notificationId} as read`);
    }
    return response;
  },
  markAllAsRead: async () => {
    const response = await fetchClient.put('/notifications/read-all');

    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }
    return response;
  },
  deleteNotification: async (notificationId: number) => {
    const response = await fetchClient.delete(`/notifications/${notificationId}`);
    if (!response.ok) {
      throw new Error(`Failed to delete notification ${notificationId}`);
    }
    return response;
  },
  deleteAllNotifications: async () => {
    const response = await fetchClient.delete('/notifications');
    if (!response.ok) {
      throw new Error('Failed to delete all notifications');
    }
    return response;
  },
};
