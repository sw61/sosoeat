import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { notificationListDemoData } from './_components/notification-list/notification-list';
import { Notification } from './index';

const meta: Meta<typeof Notification> = {
  title: 'components/common/notification/Notification',
  component: Notification,
} satisfies Meta<typeof Notification>;

export default meta;

export const Default: StoryObj<typeof Notification> = {
  render: () => (
    <Notification data={notificationListDemoData} nextCursor="" hasMore={false} unreadCount={3} />
  ),
};
