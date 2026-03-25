import { postsApi } from '@/lib/api-client';
import type { NotificationData, NotificationTypeEnum } from '@/types/generated-client';

import { EMPTY_COMMENTS_FALLBACK } from './notification-tab.constants';

export const commentDescriptionFallback = (data: NotificationData, message: string): string => {
  const trimmed = message.trim();
  if (trimmed) return trimmed;
  if (data.postTitle) return `${data.postTitle}에 새 댓글이 달렸어요`;
  return '';
};

export const getNotificationDescription = async (
  type: NotificationTypeEnum,
  data: NotificationData,
  teamId: string,
  message: string
): Promise<string> => {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return `${data.meetingName ?? ''} 모임이 확정되었어요!.`;
    case 'MEETING_CANCELED':
      return '모임이 취소되었어요';
    case 'COMMENT': {
      if (data.postId == null) return commentDescriptionFallback(data, message);
      try {
        const response = await postsApi.teamIdPostsPostIdCommentsGet({
          teamId,
          postId: data.postId,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          size: 1,
        });
        const list = response.data ?? [];
        if (list.length === 0) return EMPTY_COMMENTS_FALLBACK;
        const commentHost = list[0].author.name;
        const comment = list[0].content;
        return `${data.postTitle ?? ''}에 ${commentHost}님의 댓글 "${comment}"`;
      } catch {
        return commentDescriptionFallback(data, message);
      }
    }
    default:
      return '';
  }
};

export const notificationTitleForType = (type: NotificationTypeEnum): string => {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return '모임 확정';
    case 'MEETING_CANCELED':
      return '모임 취소';
    case 'COMMENT':
      return '댓글 알림';
    default:
      return '알림';
  }
};
