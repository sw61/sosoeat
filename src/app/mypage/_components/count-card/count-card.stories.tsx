import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CountCard } from './count-card';

const meta: Meta<typeof CountCard> = {
  title: 'COMPONENTS/common/card-count',
  component: CountCard,
  tags: ['autodocs'],
  argTypes: {
    count: { control: 'number' },
    variant: {
      control: 'select',
      options: ['meeting', 'favorite', 'post'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CountCard>;

export const Default: Story = {
  args: {
    count: 0,
    variant: 'meeting',
  },
};
export const MeetingCount: Story = {
  args: {
    variant: 'meeting',
    count: 12,
  },
};
export const FavoriteCount: Story = {
  args: {
    variant: 'favorite',
    count: 5,
  },
};
export const PostCount: Story = {
  args: {
    variant: 'post',
    count: 8,
  },
};
