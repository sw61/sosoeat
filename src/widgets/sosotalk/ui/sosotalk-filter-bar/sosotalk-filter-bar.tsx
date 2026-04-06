'use client';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';

import type {
  SosoTalkFilterBarProps,
  SosoTalkFilterTab,
  SosoTalkSortOption,
} from './sosotalk-filter-bar.types';

const DEFAULT_TABS: SosoTalkFilterTab[] = [
  { label: '전체 TALK', value: 'all' },
  { label: '인기 TALK', value: 'popular' },
];

const DEFAULT_SORT_OPTIONS: SosoTalkSortOption[] = [
  { label: '댓글순', value: 'comments' },
  { label: '좋아요순', value: 'likes' },
  { label: '최신순', value: 'latest' },
];

export const SosoTalkFilterBar = ({
  className,
  activeTab = 'all',
  activeSort = 'latest',
  tabs = DEFAULT_TABS,
  sortOptions = DEFAULT_SORT_OPTIONS,
  onTabChange = () => {},
  onSortChange = () => {},
}: SosoTalkFilterBarProps) => {
  const selectedSortOption =
    sortOptions.find((option) => option.value === activeSort) ?? DEFAULT_SORT_OPTIONS[0];

  return (
    <section className={cn('w-full', className)}>
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 py-4 pr-5 pl-1">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onTabChange(tab.value)}
                className={cn(
                  'inline-flex h-8 items-center text-xl leading-none font-semibold transition-colors',
                  isActive
                    ? 'text-sosoeat-orange-600 font-bold'
                    : 'text-sosoeat-gray-900 hover:text-sosoeat-orange-600'
                )}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {sortOptions.map((option) => {
            const isActive = option.value === activeSort;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSortChange(option.value)}
                className={cn(
                  'relative inline-flex h-8 items-center pl-3 text-base leading-none font-semibold transition-colors',
                  isActive
                    ? 'text-sosoeat-gray-900'
                    : 'text-sosoeat-gray-500 hover:text-sosoeat-gray-900'
                )}
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    'absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full',
                    isActive ? 'bg-sosoeat-orange-600' : 'bg-sosoeat-gray-300'
                  )}
                  aria-hidden
                />
                {option.label}
              </button>
            );
          })}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="text-sosoeat-gray-900 inline-flex h-8 items-center gap-1 text-base leading-none font-medium md:hidden"
              aria-label="정렬 옵션"
            >
              <span>{selectedSortOption.label}</span>
              <ChevronDown className="size-4" aria-hidden />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="md:hidden">
            <DropdownMenuRadioGroup
              value={activeSort}
              onValueChange={(value) => onSortChange(value as typeof activeSort)}
            >
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="text-sosoeat-gray-900 py-2"
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};
