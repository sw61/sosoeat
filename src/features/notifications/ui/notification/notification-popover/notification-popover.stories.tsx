import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Notification } from '@/shared/types/generated-client';

import { notificationKeys } from '../../../model/notification.queries';

import { NotificationPopover } from './notification-popover';

const mockData: Notification[] = [
  {
    id: 1,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '모임이 확정되었습니다.',
    data: { meetingName: 'Team Sync' },
    isRead: false,
    createdAt: new Date('2025-01-15T12:00:00Z'),
  },
  {
    id: 2,
    teamId: 'dallaem',
    userId: 1,
    type: 'COMMENT',
    message: '새 댓글이 달렸습니다.',
    data: {},
    isRead: true,
    createdAt: new Date('2025-01-15T10:00:00Z'),
  },
];

const meta = {
  title: 'Components/common/notification/Popover',
  component: NotificationPopover,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();

      queryClient.setQueryData(notificationKeys.list({ size: 5 }), {
        pages: [{ data: [...mockData], hasMore: false, nextCursor: null }],
        pageParams: [undefined],
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof NotificationPopover>;

export default meta;

export const Default: StoryObj<typeof NotificationPopover> = {
  render: () => <NotificationPopover unreadCount={3} />,
};
