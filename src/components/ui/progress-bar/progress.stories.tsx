import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Progress } from './progress';

const meta = {
  title: 'components/ui/progress-bar',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 (0–100)',
    },
    variant: {
      control: 'select',
      options: ['groupBuy', 'groupEat'],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    variant: 'groupEat',
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    variant: 'groupEat',
  },
};

export const Full: Story = {
  args: {
    value: 100,
    variant: 'groupEat',
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
    variant: 'groupEat',
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    variant: 'groupEat',
  },
};
