'use client';

import { useMemo } from 'react';

import Image from 'next/image';

import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown/index';

import type { KoreaRegionRegion, RegionSelection } from './region-select-modal.types';

/** 피그마 Input 행 — h 48, p 12, bg gray/50 #F9FAFB, 본문 slate/800 #333333, radius 12 */
const triggerClass =
  'focus-visible:ring-sosoeat-gray-600/35 inline-flex h-12 w-full min-w-0 items-center justify-between gap-2 ' +
  'rounded-xl bg-[#F9FAFB] px-3 py-3 text-left text-base font-normal tracking-[-0.02em] text-[#333333] outline-none ' +
  'transition-colors hover:bg-neutral-100 focus-visible:ring-2 data-[state=open]:bg-neutral-100';

const triggerSelectedClass =
  'bg-sosoeat-gray-50 ring-2 ring-inset ring-sosoeat-gray-500 hover:bg-sosoeat-gray-100';

export interface RegionCascadeSelectProps {
  regions: KoreaRegionRegion[];
  value: RegionSelection;
  onChange: (next: RegionSelection) => void;
  className?: string;
}

export function RegionCascadeSelect({
  regions,
  value,
  onChange,
  className,
}: RegionCascadeSelectProps) {
  const sortedRegions = useMemo(
    () =>
      regions.map((region) => ({
        ...region,
        districts: [...region.districts].sort((a, b) => a.localeCompare(b, 'ko-KR')),
      })),
    [regions]
  );

  return (
    <ul
      className={cn('flex min-h-0 w-full flex-col gap-4', className)}
      role="list"
      aria-label="시·도 목록"
    >
      {sortedRegions.map((r) => {
        const selectedDistricts = (value ?? [])
          .filter((s) => s.province === r.name)
          .map((s) => s.district);
        const hasSelection = selectedDistricts.length > 0;
        return (
          <li key={r.id}>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(triggerClass, hasSelection && triggerSelectedClass)}
              >
                <span className="min-w-0 flex-1 truncate">
                  {hasSelection ? `${r.name} · ${selectedDistricts.join(', ')}` : r.name}
                </span>
                {hasSelection ? (
                  <Check
                    className="text-sosoeat-orange-600 pointer-events-none size-6 shrink-0"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                ) : (
                  <Image
                    src="/icons/arrow-down.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="shrink-0"
                    aria-hidden
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={4}
                className="max-h-[min(60vh,320px)] overflow-y-auto"
              >
                <DropdownMenuGroup>
                  {r.districts.map((district) => (
                    <DropdownMenuCheckboxItem
                      key={district}
                      checked={selectedDistricts.includes(district)}
                      onCheckedChange={(checked) => {
                        const next = (value ?? []).filter(
                          (s) => !(s.province === r.name && s.district === district)
                        );
                        if (checked) {
                          onChange([...next, { province: r.name, district }]);
                        } else {
                          onChange(next.length > 0 ? next : null);
                        }
                      }}
                    >
                      {district}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        );
      })}
    </ul>
  );
}
