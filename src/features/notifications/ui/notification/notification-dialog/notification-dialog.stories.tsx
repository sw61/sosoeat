import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NotificationDialog } from './notification-dialog';

const meta = {
  title: 'Components/common/notification/Dialog',
  component: NotificationDialog,
} satisfies Meta<typeof NotificationDialog>;

export default meta;

export const Default: StoryObj<typeof NotificationDialog> = {
  render: () => <NotificationDialog unreadCount={3} />,
};
