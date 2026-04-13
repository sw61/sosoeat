import type { Notification, NotificationTypeEnum } from '@/shared/types/generated-client';

import { formatNotificationMetaRelativeTime } from './format-notification-meta-time';

export type NotificationTab = 'all' | 'meeting' | 'comment' | 'unread';

export const NOTIFICATION_TABS: { key: NotificationTab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'meeting', label: '모임' },
  { key: 'comment', label: '댓글' },
  { key: 'unread', label: '안읽음' },
];

const MEETING_TYPES: NotificationTypeEnum[] = [
  'MEETING_CONFIRMED',
  'MEETING_CANCELED',
  'MEETING_DELETED',
];

export const filterNotificationsByTab = (
  notifications: Notification[],
  tab: NotificationTab
): Notification[] => {
  switch (tab) {
    case 'meeting':
      return notifications.filter((n) => MEETING_TYPES.includes(n.type));
    case 'comment':
      return notifications.filter((n) => n.type === 'COMMENT');
    case 'unread':
      return notifications.filter((n) => !n.isRead);
    default:
      return notifications;
  }
};

export type NotificationThumbnailKey = 'approved' | 'comment' | 'meeting' | 'user';

export interface NotificationViewModel {
  description: string;
  title: string;
  metaRight: string;
  highlighted: boolean;
  isMeetingConfirmed: boolean;
  thumbnailKey: NotificationThumbnailKey;
  image?: string;
}

export const getNotificationDescription = (notification: Notification): string => {
  switch (notification.type) {
    case 'MEETING_CONFIRMED':
      return `${notification.message ?? ''}`;
    case 'MEETING_CANCELED':
      return `${notification.message ?? '모임이 취소되었어요.'}`;
    case 'COMMENT':
      return `${notification.message ?? '새 댓글이 달렸어요.'}`;
    default:
      return notification.message ?? '';
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
    case 'MEETING_DELETED':
      return '모임 삭제';
    default:
      return '알림';
  }
};

export const notificationThumbnailKeyForType = (
  type: NotificationTypeEnum
): NotificationThumbnailKey => {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return 'user';
    case 'MEETING_CANCELED':
    case 'MEETING_DELETED':
      return 'meeting';
    case 'COMMENT':
      return 'comment';
    default:
      return 'approved';
  }
};

export const getNotificationViewModel = (notification: Notification): NotificationViewModel => {
  return {
    description: getNotificationDescription(notification),
    title: notificationTitleForType(notification.type),
    metaRight: formatNotificationMetaRelativeTime(notification.createdAt),
    highlighted: !notification.isRead,
    isMeetingConfirmed: notification.type === 'MEETING_CONFIRMED',
    thumbnailKey: notificationThumbnailKeyForType(notification.type),
    image: notification.data?.image,
  };
};
