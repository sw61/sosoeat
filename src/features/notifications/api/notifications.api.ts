import { fetchClient } from '@/shared/api/fetch-client';
import { parseResponse, parseVoidResponse } from '@/shared/api/parse-response';
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
    const data = await parseResponse<NotificationList>(
      response,
      '알림 목록을 불러오는 중 문제가 생겼어요. 다시 시도해 주세요.'
    );
    const items = data.data.map((item: Notification) => ({
      ...item,
      createdAt: new Date(item.createdAt as unknown as string),
    }));

    return { ...data, data: items };
  },

  getNotificationList: async () => {
    const response = await fetchClient.get('/notifications');
    const data = await parseResponse<NotificationList>(
      response,
      '알림 목록을 불러오는 중 문제가 생겼어요. 다시 시도해 주세요.'
    );
    const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

    return items.map((item: Notification) => ({
      ...item,
      createdAt: new Date(item.createdAt as unknown as string),
    }));
  },

  getUnreadCount: async () => {
    const response = await fetchClient.get('/notifications/unread-count');
    const data = await parseResponse<{ count: number }>(
      response,
      '알림 개수를 불러오는 중 문제가 생겼어요. 다시 시도해 주세요.'
    );
    return typeof data?.count === 'number' ? data.count : 0;
  },

  markAsRead: async (notificationId: number) => {
    const response = await fetchClient.put(`/notifications/${notificationId}/read`);
    return parseVoidResponse(response, '알림 읽음 처리 중 문제가 생겼어요. 다시 시도해 주세요.');
  },

  markAllAsRead: async () => {
    const response = await fetchClient.put('/notifications/read-all');
    return parseVoidResponse(
      response,
      '알림 전체 읽음 처리 중 문제가 생겼어요. 다시 시도해 주세요.'
    );
  },
};
