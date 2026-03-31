import { useEffect } from 'react';

import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Notification, NotificationTypeEnum } from '@/types/generated-client';

import { notificationApi } from './repository/api';
import { Notification as NotificationComponent } from './index';

const mockNotificationList: { data: Notification[]; nextCursor: string; hasMore: boolean } = {
  data: [
    {
      id: 1,
      teamId: 'sosoeattest',
      userId: 1,
      type: 'COMMENT' as NotificationTypeEnum,
      message: '새 댓글이 달렸어요',
      data: {
        postId: 10,
        postTitle: '이번 주 점심 메뉴 추천',
      },
      isRead: false,
      createdAt: new Date('2026-03-30T12:00:00.000Z'),
    },
    {
      id: 2,
      teamId: 'sosoeattest',
      userId: 1,
      type: 'MEETING_CONFIRMED' as NotificationTypeEnum,
      message: '모임이 확정되었어요',
      data: {
        meetingId: 3,
        meetingName: '강남 점심 모임',
      },
      isRead: true,
      createdAt: new Date('2026-03-29T12:00:00.000Z'),
    },
  ],
  nextCursor: '',
  hasMore: false,
};

const MockNotificationApiDecorator = ({ Story }: { Story: React.ComponentType }) => {
  useEffect(() => {
    const original = notificationApi.fetchLatestNotifications;

    notificationApi.fetchLatestNotifications = async () => ({
      data: mockNotificationList.data,
      unread: mockNotificationList.data.filter((notification) => !notification.isRead).length,
    });

    return () => {
      notificationApi.fetchLatestNotifications = original;
    };
  }, []);

  return <Story />;
};

const withMockNotificationApi: Decorator = (Story) => (
  <MockNotificationApiDecorator Story={Story} />
);

const meta: Meta<typeof NotificationComponent> = {
  title: 'Components/common/notification/Notification',
  component: NotificationComponent,
} satisfies Meta<typeof NotificationComponent>;

export default meta;

export const Default: StoryObj<typeof NotificationComponent> = {
  decorators: [withMockNotificationApi],
  render: () => <NotificationComponent triggerClassName="" />,
};
