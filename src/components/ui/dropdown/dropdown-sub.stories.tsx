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
    value: {}, // placeholder (render에서 실제 값으로 대체됨)
    onChange: () => {}, // placeholder
  },
  render: (args) => {
    const [value, setValue] = useState<Record<string, string>>({});
    return <LocalDropDownSub {...args} value={value} onChange={setValue} />;
  },
};
