import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { RegionSelection } from '@/entities/location';

import { MeetingFilterBar } from './meeting-filter-bar';
import type { MeetingFilterBarProps } from './meeting-filter-bar.types';

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
    dateEnd: null,
    dateStart: null,
    regionCommitted: null,
    typeFilter: 'all',
    sortBy: 'participantCount',
    sortOrder: 'desc',
  },
  render: function MeetingFilterBarStory() {
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
    const [typeFilter, setTypeFilter] = useState<'all' | 'groupEat' | 'groupBuy'>('all');
    const [sortBy, setSortBy] = useState<MeetingFilterBarProps['sortBy']>('participantCount');
    const [sortOrder, setSortOrder] = useState<MeetingFilterBarProps['sortOrder']>('desc');

    return (
      <div className="w-full max-w-6xl">
        <MeetingFilterBar
          dateStart={dateStart}
          dateEnd={dateEnd}
          regionCommitted={regionCommitted}
          onDateChange={({ valueStart, valueEnd }) => {
            setDateStart(valueStart);
            setDateEnd(valueEnd);
          }}
          onRegionChange={setRegionCommitted}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(sortBy, sortOrder) => {
            setSortBy(sortBy);
            setSortOrder(sortOrder);
          }}
        />
      </div>
    );
  },
};
