import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingDetailProgress } from './meeting-detail-progress';

const meta = {
  title: 'components/common/meeting-detail-card/meeting-detail-progress',
  component: MeetingDetailProgress,
} satisfies Meta<typeof MeetingDetailProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupBuy: Story = {
  args: {
    id: 'meeting-detail-progress-group-buy',
    current: 5,
    max: 10,
    variant: 'groupBuy',
  },
};

export const GroupEat: Story = {
  args: {
    id: 'meeting-detail-progress-group-eat',
    current: 3,
    max: 8,
    variant: 'groupEat',
  },
};

export const Full: Story = {
  args: {
    id: 'meeting-detail-progress-full',
    current: 10,
    max: 10,
    variant: 'groupEat',
  },
};
