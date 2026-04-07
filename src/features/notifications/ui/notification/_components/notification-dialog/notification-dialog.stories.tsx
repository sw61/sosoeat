import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Notification } from '@/shared/types/generated-client';

import { NotificationDialog } from './notification-dialog';

const notificationListDemoData: Notification[] = [
  {
    id: 1,
    teamId: 'team-1',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '모임이 확정되었어요.',
    data: {
      meetingId: 101,
      meetingName: '성수 브런치 모임',
    },
    isRead: false,
    createdAt: new Date('2026-04-06T09:00:00'),
  },
  {
    id: 2,
    teamId: 'team-1',
    userId: 1,
    type: 'COMMENT',
    message: '새 댓글이 달렸어요.',
    data: {
      postId: 22,
      postTitle: '주말 맛집 추천',
      commentId: 7,
    },
    isRead: true,
    createdAt: new Date('2026-04-06T08:30:00'),
  },
];

const meta = {
  title: 'Components/common/notification/Dialog',
  component: NotificationDialog,
} satisfies Meta<typeof NotificationDialog>;

export default meta;

export const Default: StoryObj<typeof NotificationDialog> = {
  render: () => <NotificationDialog list={notificationListDemoData} unreadCount={3} />,
};
