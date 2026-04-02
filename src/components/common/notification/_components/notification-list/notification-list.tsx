'use client';

import type { Notification } from '@/types/generated-client';

import { NotificationTab } from './_components/notification-tab';

/** 스토리·데모용 샘플 — 최신순 정렬 (실제 연동 시 API `NotificationList.data`로 교체) */
export const notificationListDemoData: Notification[] = [
  {
    id: 8,
    teamId: 'dallaem',
    userId: 1,
    type: 'COMMENT',
    message: '주말 등산 후기에 새 댓글이 달렸어요',
    data: { postId: 8, postTitle: '주말 등산 후기' },
    isRead: false,
    createdAt: new Date('2026-03-25T15:30:00'),
  },
  {
    id: 7,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '',
    data: { meetingName: '한강 러닝' },
    isRead: false,
    createdAt: new Date('2026-03-25T11:00:00'),
  },
  {
    id: 6,
    teamId: 'dallaem',
    userId: 1,
    type: 'COMMENT',
    message: '',
    data: { postId: 6, postTitle: '이번 주 스터디 모집' },
    isRead: true,
    createdAt: new Date('2026-03-24T19:20:00'),
  },
  {
    id: 5,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CANCELED',
    message: '',
    data: {},
    isRead: false,
    createdAt: new Date('2026-03-24T09:15:00'),
  },
  {
    id: 4,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '',
    data: { meetingName: '달램핏' },
    isRead: true,
    createdAt: new Date('2026-03-23T14:00:00'),
  },
  {
    id: 3,
    teamId: 'dallaem',
    userId: 1,
    type: 'COMMENT',
    message: '',
    data: { postId: 3, postTitle: '내 게시글' },
    isRead: true,
    createdAt: new Date('2026-03-22T16:45:00'),
  },
  {
    id: 2,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CANCELED',
    message: '',
    data: {},
    isRead: true,
    createdAt: new Date('2026-03-21T10:30:00'),
  },
  {
    id: 1,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '',
    data: { meetingName: '주말런' },
    isRead: true,
    createdAt: new Date('2026-03-20T08:00:00'),
  },
];

export const NotificationList = () => {
  return (
    <>
      {notificationListDemoData.map((n) => (
        <NotificationTab key={n.id} {...n} />
      ))}
    </>
  );
};
