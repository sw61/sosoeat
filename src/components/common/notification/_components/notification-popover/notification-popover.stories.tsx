import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NotificationTab } from '../notification-list/_components/notification-tab';
import { notificationListDemoData } from '../notification-list/notification-list';

import { NotificationPopover } from './notification-popover';

const meta = {
  title: 'components/common/notification/Popover',
  component: NotificationPopover,
} satisfies Meta<typeof NotificationPopover>;

export default meta;

export const Default: StoryObj<typeof NotificationPopover> = {
  render: () => (
    <NotificationPopover
      list={notificationListDemoData.map((n) => (
        <NotificationTab key={n.id} {...n} />
      ))}
      unreadCount={3}
    />
  ),
};
