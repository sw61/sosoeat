import { parseISO } from 'date-fns';

import { fetchClient } from '@/shared/api/fetch-client';
import type { Comment, Notification, NotificationList } from '@/shared/types/generated-client';

import { notificationApi } from './notifications.api';

export const notificationRepository = {
  readNotification: async ({ notificationId }: { notificationId: number }) => {
    return notificationApi.markAsRead(notificationId);
  },
  fetchLatestPostComment: async ({ postId }: { postId: number }) => {
    const params = new URLSearchParams({
      sortBy: 'createdAt',
      sortOrder: 'desc',
      size: '1',
    });

    const response = await fetchClient.get(`/posts/${postId}/comments?${params.toString()}`);
    const json = await response.json();
    const data = json.data.map((comment: Comment) => ({
      ...comment,
      createdAt: parseISO(comment.createdAt as unknown as string),
      updatedAt: parseISO(comment.updatedAt as unknown as string),
    }));

    return { ...json, data };
  },
  fetchLatestNotifications: async ({
    size = 10,
    cursor = '',
    isRead = 'null',
  }: {
    size?: number;
    cursor?: string;
    isRead?: boolean | 'null';
  }) => {
    const response = await notificationApi.getNotificationOption({
      size,
      cursor: cursor || undefined,
      isRead: typeof isRead === 'boolean' ? isRead : undefined,
    });
    const json: NotificationList = await response.json();

    const data = Array.isArray(json?.data)
      ? json.data.map((notification: Notification) => ({
          ...notification,
          createdAt: new Date(notification.createdAt as unknown as string),
        }))
      : [];

    const unread = data.filter((notification: Notification) => !notification.isRead).length;

    return { data, unread };
  },
};
