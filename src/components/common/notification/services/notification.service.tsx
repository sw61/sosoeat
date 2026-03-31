import { type ReactNode, useEffect, useState } from 'react';

import type { Notification, NotificationTypeEnum } from '@/types/generated-client';

import { ApprovedIcon } from '../_components/notification-list/_components/notification-tab/_components/icons/approved-icon';
import { CommentIcon } from '../_components/notification-list/_components/notification-tab/_components/icons/comment-icon';
import { MeetingIcon } from '../_components/notification-list/_components/notification-tab/_components/icons/meeting-icon';
import { UserIcon } from '../_components/notification-list/_components/notification-tab/_components/icons/user-icon';
import { useIsMaxWidth767 } from '../hook';
import { notificationApi } from '../repository/api';

export const getNotificationDescription = async (props: Notification) => {
  switch (props.type) {
    case 'MEETING_CONFIRMED':
      return `${props.message ?? ''}`;
    case 'MEETING_CANCELED':
      return `${props.message ?? '모임이 취소되었어요.'}`;
    case 'COMMENT': {
      return `${props.message}`;
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

export const thumbnailForType = (type: NotificationTypeEnum): ReactNode => {
  switch (type) {
    case 'MEETING_CONFIRMED':
      return <UserIcon />;
    case 'MEETING_CANCELED':
      return <MeetingIcon />;
    case 'COMMENT':
      return <CommentIcon />;
    default:
      return <ApprovedIcon />;
  }
};

export const useNotificationService = () => {
  const isNarrow = useIsMaxWidth767();
  const [unreadCount, setUnreadCount] = useState(0);
  const [list, setList] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchLatestNotifications = async () => {
      try {
        const teamId: string | undefined = process.env.NEXT_PUBLIC_TEAM_ID;
        const { data, unread } = await notificationApi.fetchLatestNotifications({
          teamId: teamId ?? '',
        });

        setList(data);
        setUnreadCount(unread);
      } catch (error) {
        console.error('알림을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchLatestNotifications();
  }, []);

  return {
    isNarrow,
    list,
    unreadCount,
  };
};
