import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkFilterBar, type SosoTalkSortValue, type SosoTalkTabValue } from './index';

const meta = {
  title: 'pages/sosotalk/sosotalk-filterbar',
  component: SosoTalkFilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SosoTalkFilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function SosoTalkFilterBarStory() {
    const [activeTab, setActiveTab] = useState<SosoTalkTabValue>('all');
    const [activeSort, setActiveSort] = useState<SosoTalkSortValue>('latest');

    return (
      <div className="bg-white py-8">
        <SosoTalkFilterBar
          activeTab={activeTab}
          activeSort={activeSort}
          onTabChange={setActiveTab}
          onSortChange={setActiveSort}
        />
      </div>
    );
  },
};
