'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { DetailDatePicker } from '@/components/common/date-picker';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import regionData from '@/data/korea-regions-districts.json';
import { meetingFilterPillTriggerClass } from '@/lib/meeting-filter-pill';
import { cn } from '@/lib/utils';

import { RegionSelectModal } from '../region-select-modal';

import { MeetingFilterBarButton } from './_components/meeting-filter-bar-button';
import { options } from './repositories/options';
import type { MeetingFilterBarProps } from './meeting-filter-bar.types';

type SortOption = (typeof options)[number];

export const MeetingFilterBar = ({
  onTypeFilterChange = () => {},
  regionCommitted,
  dateStart,
  dateEnd,
  className,
  typeFilter,
  sortOrder: _sortOrder,
  sortBy: _sortBy,
  onSortChange = () => {},
  onDateChange = () => {},
  onRegionChange = () => {},
}: MeetingFilterBarProps) => {
  // const [selectedSortLabel, setSelectedSortLabel] = useState<string | null>(null);
  // const DEFAULT_SORT = { sortBy: 'participantCount', sortOrder: 'desc' } as const;

  // const handleSortItemChecked = (option: SortOption) => {
  //   const isSelected = selectedSortLabel === option.label;
  //   if (isSelected) {
  //     setSelectedSortLabel(null);
  //     onSortChange(DEFAULT_SORT.sortBy, DEFAULT_SORT.sortOrder);
  //     return;
  //   }
  //   setSelectedSortLabel(option.label);
  //   onSortChange(option.sortBy, option.sortOrder);
  // };
  const [selectedSortLabel, setSelectedSortLabel] = useState<string | null>(() => {
    const selectedOption = options.find(
      (option) => option.sortBy === _sortBy && option.sortOrder === _sortOrder
    );
    return selectedOption ? selectedOption.label : null;
  });

  const handleSortItemChecked = (option: SortOption) => {
    const isSelected = selectedSortLabel === option.label;
    if (isSelected) {
      setSelectedSortLabel(null);
      onSortChange('participantCount', 'desc');
      return;
    }
    setSelectedSortLabel(option.label);
    onSortChange(option.sortBy, option.sortOrder);
  };
  return (
    <div
      className={cn(
        // mobile-first: base = stacked rows, md+ = single row
        'flex w-full flex-col justify-start gap-2 sm:justify-between md:flex-row md:items-center md:gap-0',
        className
      )}
    >
      {/* Frame 2610400 — w 283, 탭 간 space-between (피그마 gap 60 대응) */}
      <div className="flex h-10 w-full max-w-xs items-center gap-[24.5px]">
        <MeetingFilterBarButton
          filterType="all"
          label="전체"
          selected={typeFilter === 'all'}
          onClick={() => onTypeFilterChange('all')}
        />
        <MeetingFilterBarButton
          filterType="groupEat"
          label="함께먹기"
          selected={typeFilter === 'groupEat'}
          onClick={() => onTypeFilterChange('groupEat')}
        />
        <MeetingFilterBarButton
          filterType="groupBuy"
          label="공동구매"
          selected={typeFilter === 'groupBuy'}
          onClick={() => onTypeFilterChange('groupBuy')}
        />
      </div>

      {/* Frame 2610402 — h 32 필터 행 */}
      <div className="flex h-8 w-full items-center justify-start gap-2 sm:justify-end md:w-auto">
        <DetailDatePicker
          valueStart={dateStart}
          valueEnd={dateEnd}
          onDateChange={onDateChange}
          className={cn(meetingFilterPillTriggerClass, 'min-w-24')}
        />
        <RegionSelectModal
          trigger={
            <button type="button" className={cn(meetingFilterPillTriggerClass, 'min-w-24')}>
              <span>
                {regionCommitted == null
                  ? '지역 전체'
                  : `${regionCommitted.province} ${regionCommitted.district}`}
              </span>
              <ChevronDown className="text-sosoeat-gray-600 size-4 shrink-0" aria-hidden />
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
        {
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(meetingFilterPillTriggerClass, 'min-w-[45px]')}>
              <span>{selectedSortLabel ?? '정렬'}</span>
              <ChevronDown className="size-4 shrink-0" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn(
                'flex h-40 w-[134px] flex-col items-stretch overflow-hidden rounded-xl border border-[#E8E8E8] bg-white p-0',
                'shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
              )}
            >
              {options.map((option) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={option.label}
                    checked={selectedSortLabel === option.label}
                    onCheckedChange={() => handleSortItemChecked(option)}
                    className={cn(
                      'relative flex h-10 min-h-10 w-full flex-none cursor-pointer items-center gap-[6px] rounded-none border-0 py-0 pr-3 pl-[11px] text-sm leading-5 font-medium text-[#333333] outline-none select-none',
                      'focus:text-[#333333] data-[highlighted]:text-[#333333]',
                      selectedSortLabel === option.label
                        ? 'bg-[#E8F3FF] focus:bg-[#E8F3FF] data-[highlighted]:bg-[#E8F3FF]'
                        : 'bg-white focus:bg-white data-[highlighted]:bg-white',
                      '[&_[data-slot=dropdown-menu-checkbox-item-indicator]]:hidden'
                    )}
                  >
                    <span
                      className={cn(
                        'size-[6px] shrink-0 rounded-full',
                        selectedSortLabel === option.label ? 'bg-[#3182F6]' : 'bg-[#D9D9D9]'
                      )}
                      aria-hidden
                    />
                    <span>{option.label}</span>
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  );
};
