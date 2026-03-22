import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CountingBadge } from './counting-badge';

const meta = {
  title: 'components/common/counting-badge',
  component: CountingBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    count: { control: { type: 'number', min: 0 } },
    size: { control: 'radio', options: ['large', 'small'] },
  },
} satisfies Meta<typeof CountingBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  name: 'Large (기본)',
  args: { count: 5 },
};

export const Small: Story = {
  name: 'Small',
  args: { count: 5, size: 'small' },
};

export const ZeroCount: Story = {
  name: '카운트 0',
  args: { count: 0 },
};
