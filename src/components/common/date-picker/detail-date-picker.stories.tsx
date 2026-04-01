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
    const [valueStart, setValueStart] = useState<Date | null>(null);
    const [valueEnd, setValueEnd] = useState<Date | null>(null);
    return (
      <DetailDatePicker
        {...args}
        valueStart={valueStart}
        valueEnd={valueEnd}
        onDateChange={({ valueStart, valueEnd }) => {
          setValueStart(valueStart);
          setValueEnd(valueEnd);
        }}
      />
    );
  },
  args: {
    variant: 'groupBuy',
    valueStart: null,
    valueEnd: null,
    onDateChange: () => {},
  },
};

export const GroupEat: Story = {
  render: function Template(args) {
    const [valueStart, setValueStart] = useState<Date | null>(null);
    const [valueEnd, setValueEnd] = useState<Date | null>(null);
    return (
      <DetailDatePicker
        {...args}
        valueStart={valueStart}
        valueEnd={valueEnd}
        onDateChange={({ valueStart, valueEnd }) => {
          setValueStart(valueStart);
          setValueEnd(valueEnd);
        }}
      />
    );
  },
  args: {
    variant: 'groupEat',
    valueStart: null,
    valueEnd: null,
    onDateChange: () => {},
  },
};
