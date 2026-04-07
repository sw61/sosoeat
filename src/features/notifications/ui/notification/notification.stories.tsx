import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Notification, NotificationTypeEnum } from '@/shared/types/generated-client';

import { notificationRepository } from '../../api';

import { Notification as NotificationComponent } from './index';

const mockNotificationList: Notification[] = [
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
];

/**
 * notificationRepository의 fetchLatestNotifications를 mock 데이터로 오버라이드
 * 이 설정은 모든 story에서 실제 API 호출을 차단합니다.
//  */
// const originalFetch = notificationRepository.fetchLatestNotifications;
notificationRepository.fetchLatestNotifications = async () => ({
  data: mockNotificationList,
  unread: mockNotificationList.filter((notification) => !notification.isRead).length,
});

const meta: Meta<typeof NotificationComponent> = {
  title: 'Components/common/notification/Notification',
  component: NotificationComponent,
} satisfies Meta<typeof NotificationComponent>;

export default meta;

export const Default: StoryObj<typeof NotificationComponent> = {
  render: () => <NotificationComponent triggerClassName="" />,
};
