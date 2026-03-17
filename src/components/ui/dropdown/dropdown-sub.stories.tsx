// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LocalDropDownSub, regionData } from '@/components/ui/dropdown';

const meta = {
  component: LocalDropDownSub,
} satisfies Meta<typeof LocalDropDownSub>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: {
      label: regionData.regions[0].name,
      options: regionData.regions[0].districts,
    },
    value: {},
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<Record<string, string>>({});
    return <LocalDropDownSub {...args} value={value} onChange={setValue} />;
  },
};

export const Customized: Story = {
  args: {
    data: {
      label: regionData.regions[0].name,
      options: regionData.regions[0].districts,
    },
    value: {},
    onChange: () => {},
    triggerClassName:
      'rounded-xl border-2 border-emerald-500 bg-emerald-50 px-4 py-2 font-semibold text-emerald-900 hover:bg-emerald-100',
    contentClassName: 'min-w-56 rounded-xl shadow-lg border border-emerald-200',
    itemClassName:
      'hover:bg-emerald-100 data-[state=checked]:bg-emerald-200 data-[state=checked]:text-emerald-900',
  },
  render: (args) => {
    const [value, setValue] = useState<Record<string, string>>({});
    return <LocalDropDownSub {...args} value={value} onChange={setValue} />;
  },
};
