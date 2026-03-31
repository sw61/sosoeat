import { postsApi } from '@/lib/api-client';
import { fetchClient } from '@/lib/http/fetch-client';
import type { Notification, NotificationList } from '@/types/generated-client';

export const notificationApi = {
  readNotification: ({ notificationId }: { notificationId: number }) => {
    return fetchClient.put(`/notifications/${notificationId}/read`);
  },
  fetchLatestPostComment: ({ teamId, postId }: { teamId: string; postId: number }) => {
    return postsApi.teamIdPostsPostIdCommentsGet({
      teamId,
      postId,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      size: 1,
    });
  },
  fetchUsersUserId: async ({ userId }: { userId: number }) => {
    const response = await fetchClient.get(`/users/${userId}`);
    return await response.json();
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

    // API에서 받은 데이터의 createdAt은 string이므로 Date 객체로 변환
    data.data.map((n) => {
      n.createdAt = new Date(n.createdAt);
    });

    const unread = data.data.filter((n: Notification) => !n.isRead).length;
    return { data: data.data, unread };
  },
};
