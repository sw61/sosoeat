import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'components/ui/modal-date-picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['groupEat', 'groupBuy'],
    },
    value: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
    onChange: { action: 'onChange' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: '모임 날짜',
    variant: 'groupEat',
    placeholder: 'YYYY-MM-DD',
  },
};

export const WithValue: Story = {
  args: {
    label: '날짜 선택됨',
    value: '2024-12-25',
    variant: 'groupEat',
  },
};

export const GroupBuyVariant: Story = {
  args: {
    label: '공동구매 형태',
    variant: 'groupBuy',
  },
};

export const Error: Story = {
  args: {
    label: '에러 상태',
    errorMessage: '날짜를 선택해 주세요.',
    variant: 'groupEat',
  },
};
