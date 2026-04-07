import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { NotificationPopover } from './notification-popover';

const meta = {
  title: 'Components/common/notification/Popover',
  component: NotificationPopover,
} satisfies Meta<typeof NotificationPopover>;

export default meta;

export const Default: StoryObj<typeof NotificationPopover> = {
  render: () => <NotificationPopover unreadCount={3} />,
};
