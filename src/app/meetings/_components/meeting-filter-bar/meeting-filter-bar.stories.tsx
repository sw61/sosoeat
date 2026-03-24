import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingFilterBar } from './meeting-filter-bar';
import type { RegionSelection } from './meeting-filter-bar.types';

const meta = {
  title: 'app/meetings/meeting-filter-bar',
  component: MeetingFilterBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MeetingFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
  args: {
    date: null,
    regionCommitted: null,
  },
  render: function MeetingFilterBarStory() {
    const [date, setDate] = useState<Date | null>(null);
    const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);

    return (
      <div className="w-full max-w-[1140px]">
        <MeetingFilterBar
          date={date}
          regionCommitted={regionCommitted}
          onDateChange={setDate}
          onRegionChange={setRegionCommitted}
        />
      </div>
    );
  },
};
