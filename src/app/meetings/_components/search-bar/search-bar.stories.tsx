import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SearchBar } from './index';

const meta = {
  title: 'app/meetings/search-bar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  args: {
    value: '',
    onChange: () => {},
    placeholder: '모임 검색 (제목, 태그, 지역 등)',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function SearchBarStory(args) {
    const [value, setValue] = useState('');
    return (
      <div className="w-full max-w-[1140px] px-4">
        <SearchBar placeholder={args.placeholder} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const largeScreen: Story = {
  render: function SearchBarStory(args) {
    const [value, setValue] = useState('');
    return (
      <div className="w-300 max-w-[1140px] px-4">
        <SearchBar placeholder={args.placeholder} value={value} onChange={setValue} />
      </div>
    );
  },
};
