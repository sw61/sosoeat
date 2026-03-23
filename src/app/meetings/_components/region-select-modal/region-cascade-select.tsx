'use client';

import { ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/index';
import { cn } from '@/lib/utils';

import type { KoreaRegionRegion } from './region-select-modal.type';

/** 피그마 Input 행 — h 48, p 12, bg gray/50 #F9FAFB, 본문 slate/800 #333333, radius 12 */
const triggerClass =
  'focus-visible:ring-sosoeat-orange-600/35 inline-flex h-12 w-full min-w-0 items-center justify-between gap-2 ' +
  'rounded-xl bg-[#F9FAFB] px-3 py-3 text-left text-base font-normal tracking-[-0.02em] text-[#333333] outline-none ' +
  'transition-colors hover:bg-neutral-100 focus-visible:ring-2 data-[state=open]:bg-neutral-100';

const triggerSelectedClass =
  'bg-sosoeat-orange-50 ring-2 ring-sosoeat-orange-500 hover:bg-sosoeat-orange-50';

export interface RegionCascadeSelectProps {
  regions: KoreaRegionRegion[];
  value: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  className?: string;
}

export function RegionCascadeSelect({
  regions,
  value,
  onChange,
  className,
}: RegionCascadeSelectProps) {
  return (
    <ul
      className={cn('flex min-h-0 w-full flex-col gap-4', className)}
      role="list"
      aria-label="시·도 목록"
    >
      {regions.map((r) => {
        const hasSelection = Boolean(value[r.name]);
        return (
          <li key={r.id}>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(triggerClass, hasSelection && triggerSelectedClass)}
              >
                <span className="min-w-0 flex-1 truncate">{r.name}</span>
                <ChevronDownIcon
                  className="pointer-events-none size-6 shrink-0 text-[#333333]"
                  aria-hidden
                />
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
                      checked={value[r.name] === district}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onChange({ [r.name]: district });
                        } else {
                          const next = { ...value };
                          if (next[r.name] === district) {
                            delete next[r.name];
                          }
                          onChange(next);
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
