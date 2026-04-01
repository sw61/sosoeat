import { parseISO } from 'date-fns';

import { fetchClient } from '@/lib/http/fetch-client';
import type { Comment, Notification, NotificationList } from '@/types/generated-client';

export const notificationApi = {
  readNotification: ({ notificationId }: { notificationId: number }) => {
    return fetchClient.put(`/notifications/${notificationId}/read`);
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
      createdAt: parseISO(comment.createdAt as unknown as string), // string을 Date 객체로 변환
      updatedAt: parseISO(comment.updatedAt as unknown as string), // string을 Date 객체로 변환
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
    const params = new URLSearchParams({
      size: size.toString(),
      ...(cursor && { cursor }),
      ...(isRead !== 'null' && { isRead: isRead.toString() }),
    });
    const data: NotificationList = await fetchClient
      .get(`/notifications?${params.toString()}`)
      .then((res) => res.json());

    if (!data || !data.data) {
      return { data: [], unread: 0 };
    }
    // API에서 받은 데이터의 createdAt은 string이므로 Date 객체로 변환
    data.data.map((n) => {
      n.createdAt = new Date(n.createdAt);
    });

    const unread = data.data.filter((n: Notification) => !n.isRead).length;
    return { data: data.data, unread };
  },
};
