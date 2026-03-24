import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProgressWithLabel } from '@/components/common/progress-with-label';

const meta = {
  title: 'components/common/progress-with-label',
  component: ProgressWithLabel,
} satisfies Meta<typeof ProgressWithLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupBuy: Story = {
  args: {
    id: 'progress-group-buy',
    current: 5,
    max: 10,
    variant: 'groupBuy',
  },
};

export const GroupEat: Story = {
  args: {
    id: 'progress-group-eat',
    current: 3,
    max: 8,
    variant: 'groupEat',
  },
};

export const Full: Story = {
  args: {
    id: 'progress-full',
    current: 10,
    max: 10,
    variant: 'groupEat',
  },
};
