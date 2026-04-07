import { type ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { Notification, NotificationTypeEnum } from '@/shared/types/generated-client';

import { notificationApi } from '../api';
import { ApprovedIcon } from '../ui/notification/_components/notification-tab/_components/icons/approved-icon';
import { CommentIcon } from '../ui/notification/_components/notification-tab/_components/icons/comment-icon';
import { MeetingIcon } from '../ui/notification/_components/notification-tab/_components/icons/meeting-icon';
import { UserIcon } from '../ui/notification/_components/notification-tab/_components/icons/user-icon';

import { notificationQueryOptions } from './notifications.options';

export const getNotificationDescription = (props: Notification) => {
  switch (props.type) {
    case 'MEETING_CONFIRMED':
      return `${props.message ?? ''}`;
    case 'MEETING_CANCELED':
      return `${props.message ?? '모임이 취소되었어요.'}`;
    case 'COMMENT': {
      return `${props.message ?? '새 댓글이 달렸어요.'}`;
    }
    default:
      return props.message ?? '';
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

export const thumbnailForType = (type: NotificationTypeEnum): ReactNode => {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return <UserIcon />;
    case 'MEETING_CANCELED':
      return <MeetingIcon />;
    case 'MEETING_DELETED':
      return <MeetingIcon />;
    case 'COMMENT':
      return <CommentIcon />;
    default:
      return <ApprovedIcon />;
  }
};

export const useNotificationService = () => {
  const { isLoading, error, data: notifications } = useQuery(notificationQueryOptions.list);
  const { data: unreadCountData } = useQuery(notificationQueryOptions.unreadCount);

  const list = Array.isArray(notifications)
    ? notifications
    : Array.isArray(notifications?.data)
      ? notifications.data
      : [];

  return {
    unreadCount: unreadCountData ?? 0,
    list,
    isLoading,
    error,
  };
};

export const useNotificationReadActions = (notificationId?: number) => {
  const markAsRead = async () => {
    try {
      if (notificationId == null) {
        return;
      }
      await notificationApi.markAsRead(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };
  return {
    markAsRead,
    markAllAsRead,
  };
};
