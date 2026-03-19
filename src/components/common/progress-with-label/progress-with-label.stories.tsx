import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ProgressWithLabel } from './progress-with-label';

const meta = {
  title: 'components/common/progress-with-label',
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
