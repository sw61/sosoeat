import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { EstablishmentStatusBadge } from './establishment-status-badge';

const meta = {
  title: 'Components/common/EstablishmentStatusBadge',
  component: EstablishmentStatusBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    confirmedAt: { control: false },
    variant: { control: 'radio', options: ['groupEat', 'groupBuy'] },
  },
} satisfies Meta<typeof EstablishmentStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupEatEstablished: Story = {
  name: '개설확정 - groupEat',
  args: {
    confirmedAt: new Date('2026-03-31T12:00:00'),
    variant: 'groupEat',
  },
};

export const GroupBuyEstablished: Story = {
  name: '개설확정 - groupBuy',
  args: {
    confirmedAt: new Date('2026-03-31T12:00:00'),
    variant: 'groupBuy',
  },
};

export const GroupEatPending: Story = {
  name: '개설대기 - groupEat',
  args: {
    confirmedAt: null,
    variant: 'groupEat',
  },
};

export const GroupBuyPending: Story = {
  name: '개설대기 - groupBuy',
  args: {
    confirmedAt: null,
    variant: 'groupBuy',
  },
};
