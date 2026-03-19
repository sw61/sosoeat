import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DropdownSimple } from './dropdown-simple';

const meta = {
  component: DropdownSimple,
} satisfies Meta<typeof DropdownSimple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: ['한식', '일식', '중식', '양식'],
    placeholder: '음식 종류 선택',
    value: null,
    onChange: () => {},
    itemClassName: '',
    triggerClassName: '',
  },
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);
    return <DropdownSimple {...args} value={value} onChange={setValue} />;
  },
};
