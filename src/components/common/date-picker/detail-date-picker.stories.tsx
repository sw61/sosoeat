import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DetailDatePicker } from '@/components/common/date-picker/detail-date-picker';

const meta = {
  title: 'components/common/detail-date-picker',
  component: DetailDatePicker,
} satisfies Meta<typeof DetailDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Template(args) {
    const [value, setValue] = useState<Date | null>(null);
    return <DetailDatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    variant: 'groupBuy',
    value: null,
    onChange: () => {},
  },
};

export const GroupEat: Story = {
  render: function Template(args) {
    const [value, setValue] = useState<Date | null>(null);
    return <DetailDatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    variant: 'groupEat',
    value: null,
    onChange: () => {},
  },
};
