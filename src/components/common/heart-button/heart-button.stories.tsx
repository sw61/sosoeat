import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { HeartButton } from './heart-button';

const meta = {
  title: 'components/common/heart-button',
  component: HeartButton,
  args: {
    size: 'lg',
  },
} satisfies Meta<typeof HeartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFavorited: Story = {
  args: {
    isFavorited: false,
  },
};

export const Favorited: Story = {
  args: {
    isFavorited: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    isFavorited: false,
  },
};

export const MediumFavorited: Story = {
  args: {
    size: 'md',
    isFavorited: true,
  },
};
