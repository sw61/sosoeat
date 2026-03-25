import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NotificationTab } from '../notification-list/_components/notification-tab';
import { notificationListDemoData } from '../notification-list/notification-list';

import { NotificationDialog } from './notification-dialog';

const meta: Meta<typeof NotificationDialog> = {
  title: 'components/common/notification/Dialog',
  component: NotificationDialog,
} satisfies Meta<typeof NotificationDialog>;

export default meta;

export const Default: StoryObj<typeof NotificationDialog> = {
  render: () => (
    <NotificationDialog
      list={notificationListDemoData.map((n) => (
        <NotificationTab key={n.id} {...n} />
      ))}
      unreadCount={3}
    />
  ),
};
