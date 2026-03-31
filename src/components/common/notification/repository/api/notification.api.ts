import { postsApi } from '@/lib/api-client';
import { fetchClient } from '@/lib/http/fetch-client';
import type { Notification, NotificationList } from '@/types/generated-client';

export const notificationApi = {
  readNotification: ({ notificationId }: { notificationId: number }) => {
    return fetchClient.get(`/notifications/${notificationId}/read`);
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
    teamId: string;
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
    const unread = data.data.filter((n: Notification) => !n.isRead).length;
    return { data: data.data, unread };
  },
};
