'use server';

import { apiServer } from '@/shared/api/api-server';
import { Notification, NotificationList } from '@/shared/types/generated-client';

/**
 * 알림 목록 조회 (서버 컴포넌트 전용)
 * GET /notifications
 */
export async function getNotificationListServer(options?: { size?: number }): Promise<{
  data: Notification[];
  hasMore: boolean;
  nextCursor: string | undefined;
}> {
  const params = new URLSearchParams();
  if (options?.size) params.append('size', String(options.size));

  const response = await apiServer.get(`/notifications?${params.toString()}`);

  if (response.status === 401) {
    return { data: [], hasMore: false, nextCursor: undefined };
  }

  if (!response.ok) {
    return { data: [], hasMore: false, nextCursor: undefined };
  }

  const json: NotificationList = await response.json();

  const items = json.data.map((item: Notification) => ({
    ...item,
    createdAt: new Date(item.createdAt as unknown as string),
  }));

  return { ...json, data: items };
}

/**
 * 읽지 않은 알림 개수 조회 (서버 컴포넌트 전용)
 * GET /notifications/unread-count
 */
export async function getUnreadCountServer(): Promise<number> {
  const response = await apiServer.get('/notifications/unread-count');

  if (response.status === 401) return 0;
  if (!response.ok) return 0;

  const data = await response.json();
  return typeof data?.count === 'number' ? data.count : 0;
}
