'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { DetailDatePicker } from '@/components/common/date-picker';
import regionData from '@/data/korea-regions-districts.json';
import {
  meetingFilterPillLabelClass,
  meetingFilterPillTriggerClass,
} from '@/lib/meeting-filter-pill';
import { cn } from '@/lib/utils';

import { RegionSelectModal } from '../region-select-modal';

import { MeetingFilterBarButton } from './_components/meetig-filter-bar-button';
import type { MeetingFilterBarProps } from './meeting-filter-bar.types';

export const MeetingFilterBar = ({
  regionCommitted,
  date,
  className,
  onFilterButtonClick = () => {},
  onDateChange = () => {},
  onRegionChange = () => {},
}: MeetingFilterBarProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'groupEat' | 'groupBuy'>('all');

  const handleTabClick = (filterType: string) => {
    if (filterType === 'all' || filterType === 'groupEat' || filterType === 'groupBuy') {
      setActiveTab(filterType);
    }
    onFilterButtonClick(filterType);
  };

  return (
    <div
      className={cn(
        'flex min-h-10 w-full max-w-[1140px] flex-row flex-wrap items-center justify-between gap-y-2 px-1 md:flex-nowrap md:gap-y-0',
        className
      )}
    >
      {/* Frame 2610400 — w 283, 탭 간 space-between (피그마 gap 60 대응) */}
      <div className="flex h-10 max-w-[min(283px,100%)] shrink-0 items-center justify-between gap-[24.5px]">
        <MeetingFilterBarButton
          filterType="all"
          label="전체"
          selected={activeTab === 'all'}
          onClick={handleTabClick}
        />
        <MeetingFilterBarButton
          filterType="groupEat"
          label="함께먹기"
          selected={activeTab === 'groupEat'}
          onClick={handleTabClick}
        />
        <MeetingFilterBarButton
          filterType="groupBuy"
          label="공동구매"
          selected={activeTab === 'groupBuy'}
          onClick={handleTabClick}
        />
      </div>

      {/* Frame 2610402 — h 32 필터 행 */}
      <div className="flex h-8 shrink-0 items-center justify-end gap-2">
        <DetailDatePicker value={date} onChange={onDateChange} />
        <RegionSelectModal
          trigger={
            <button type="button" className={cn(meetingFilterPillTriggerClass, 'min-w-[93px]')}>
              <span className={meetingFilterPillLabelClass(regionCommitted != null)}>
                {regionCommitted == null
                  ? '지역 전체'
                  : `${regionCommitted.province} ${regionCommitted.district}`}
              </span>
              <ChevronDown className="text-sosoeat-gray-600 size-[17px] shrink-0" aria-hidden />
            </button>
          }
          title="지역"
          description="지역을 선택해주세요."
          regionCascade={{ regions: regionData.regions }}
          dropdownSub={{
            data: { label: '_', options: [] },
            value: regionCommitted,
            onChange: onRegionChange,
          }}
        />
        <button type="button" className={cn(meetingFilterPillTriggerClass, 'min-w-[71px]')}>
          <span className={meetingFilterPillLabelClass(false)}>인기순</span>
        </button>
      </div>
    </div>
  );
};
