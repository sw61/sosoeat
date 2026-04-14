import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DeadlineBadge } from './deadline-badge';

const meta = {
  title: 'entities/meeting/ui/DeadlineBadge',
  component: DeadlineBadge,
} satisfies Meta<typeof DeadlineBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupBuy: Story = {
  args: {
    registrationEnd: new Date('2026-04-08T12:00:00'), // 2일 후
    variant: 'groupEat',
  },
};
