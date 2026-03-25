'use client';

import { NotificationDialog } from './_components/notification-dialog';
import { NotificationTab } from './_components/notification-list';
import { NotificationPopover } from './_components/notification-popover';
import { useIsMaxWidth767 } from './_components/use-is-max-width-767';
import type { NotificationProps } from './notification.types';
// {
//   "data": [
//     {
//       "id": 0,
//       "teamId": "string",
//       "userId": 0,
//       "type": "MEETING_CONFIRMED",
//       "message": "string",
//       "data": {
//         "meetingId": 0,
//         "meetingName": "string",
//         "postId": 0,
//         "postTitle": "string",
//         "commentId": 0,
//         "image": "string"
//       },
//       "isRead": true,
//       "createdAt": "2026-03-24T22:13:12.009Z"
//     }
//   ],
//   "nextCursor": "string",
//   "hasMore": true
//  }
// 알림 종류: 개설 확정(MEETING_CONFIRMED), 모임 취소(MEETING_CANCELED), 댓글(COMMENT)
// isRead 파라미터로 읽음/미읽음 필터링 가능

export const Notification = ({ ...props }: NotificationProps) => {
  const isNarrow = useIsMaxWidth767();
  const unreadCount: number = props.data.filter((n) => !n.isRead).length;

  const list = props.data.map((n) => <NotificationTab key={n.id} {...n} />);

  if (isNarrow) {
    return (
      <NotificationDialog
        triggerClassName={props.triggerClassName}
        list={list}
        unreadCount={unreadCount}
      />
    );
  }

  return (
    <NotificationPopover
      triggerClassName={props.triggerClassName}
      list={list}
      unreadCount={unreadCount}
    />
  );
};
