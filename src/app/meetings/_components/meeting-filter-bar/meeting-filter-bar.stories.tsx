import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingFilterBar } from './meeting-filter-bar';
import type { MeetingFilterBarProps, RegionSelection } from './meeting-filter-bar.types';

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
    sort: 'participantCount',
  },
  render: function MeetingFilterBarStory() {
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
    const [typeFilter, setTypeFilter] = useState<'all' | 'groupEat' | 'groupBuy'>('all');
    const [sort, setSort] = useState<MeetingFilterBarProps['sort']>('participantCount');

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
          sort={sort}
          onSortChange={(sortBy, sortOrder) => {
            setSort(sortBy);
          }}
        />
      </div>
    );
  },
};
