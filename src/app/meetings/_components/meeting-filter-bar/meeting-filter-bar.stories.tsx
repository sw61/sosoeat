import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingFilterBar } from './meeting-filter-bar';

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
    regionCommitted: {},
  },
  render: function MeetingFilterBarStory() {
    const [date, setDate] = useState<DateRange | null>(null);
    const [regionCommitted, setRegionCommitted] = useState<Record<string, string>>({});

    return (
      <div className="w-[1140px]">
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
