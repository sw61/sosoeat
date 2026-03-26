'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import type { SearchBarProps } from './search-bar.types';

/**
 * 피그마 Text Input — 1140×47, padding 12·16·12·40, #E5E8EB, radius 14.
 * shadcn `Input`에 `className`으로 스펙을 덮어씀 (`cn` tailwind-merge).
 */
const searchInputClassName = cn(
  // mobile-first; no arbitrary px
  'box-border h-12 w-full min-w-0 rounded-xl border border-solid border-[#E5E8EB] bg-white dark:bg-white',
  'px-4 py-3 pl-10',
  'text-sm leading-5 font-normal text-[#191F28]',
  'placeholder:text-[rgba(25,31,40,0.5)]',
  'transition-colors',
  'focus-visible:ring-sosoeat-orange-500/25 focus-visible:border-[#E5E8EB] focus-visible:ring-2 focus-visible:outline-none',
  'focus:ring-sosoeat-orange-500/25 focus:border-[#E5E8EB] focus:ring-2 focus:outline-none'
);

export const SearchBar = ({
  value,
  onChange,
  placeholder = '모임 검색 (제목, 태그, 지역 등)',
  className,
}: SearchBarProps) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    onChange(next);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        onChange(next);
      }, 1000)
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="relative w-full min-w-0">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-[rgba(25,31,40,0.5)]"
          aria-hidden
          strokeWidth={2}
        />
        <Input
          type="search"
          placeholder={placeholder}
          className={searchInputClassName}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          aria-label={placeholder}
        />
      </div>
    </div>
  );
};
