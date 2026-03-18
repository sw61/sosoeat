import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProgressWithLabel } from '.';

const meta = {
  title: 'ui/progress-bar/with-label',
  component: ProgressWithLabel,
} satisfies Meta<typeof ProgressWithLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    current: 5,
    max: 10,
    variant: 'groupBuy',
  },
};
