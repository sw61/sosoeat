'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { DetailDatePicker } from '@/components/common/date-picker';
import regionData from '@/data/korea-regions-districts.json';
import { cn } from '@/lib/utils';

import { RegionSelectModal } from '../region-select-modal';

import { MeetingFilterBarButton } from './_components/meetig-filter-bar-button';
import type { MeetingFilterBarProps } from './meeting-filter-bar.types';

/** 피그마 Filter 행 — padding 4×8, h 32, slate/600 본문 */
const filterPillClass =
  'inline-flex h-8 cursor-pointer items-center justify-center gap-0.5 rounded-md border-0 bg-transparent px-2 py-1 text-base font-medium tracking-[-0.02em] text-[#737373] shadow-none hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none';

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
        'flex h-10 w-full max-w-[1140px] flex-row flex-nowrap items-center gap-[584.93px] px-1',
        className
      )}
    >
      {/* Frame 2610400 — 탭 그룹, gap 60 · 공동구매 ↔ 날짜 전체 간격 584.93 (피그마) */}
      <div className="flex shrink-0 items-center gap-[24.5px]">
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

      {/* Frame 2610402 — 우측 필터 */}
      <div className="flex shrink-0 items-center justify-end gap-2">
        <DetailDatePicker value={date} onChange={onDateChange} />
        <RegionSelectModal
          trigger={
            <button type="button" className={cn(filterPillClass, 'min-w-[93px]')}>
              <span>지역 전체</span>
              <ChevronDown className="size-[17px] shrink-0 text-[#737373]" aria-hidden />
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
        <button type="button" className={cn(filterPillClass, 'min-w-[71px]')}>
          인기순
        </button>
      </div>
    </div>
  );
};
