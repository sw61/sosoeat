'use client';

import { useMemo, useRef, useState } from 'react';

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

const triggerClass =
  'focus-visible:ring-sosoeat-gray-600/35 inline-flex h-12 w-full min-w-0 cursor-pointer items-center justify-between gap-2 ' +
  'rounded-xl bg-[#F9FAFB] px-3 py-3 text-left text-base font-normal tracking-[-0.02em] text-[#333333] outline-none ' +
  'transition-colors hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent';

const triggerSelectedClass =
  'bg-sosoeat-gray-50 ring-2 ring-inset ring-sosoeat-gray-500 hover:bg-sosoeat-gray-100';

export interface RegionCascadeSelectProps {
  regions: KoreaRegionRegion[];
  value: RegionSelection;
  onChange: (next: RegionSelection) => void;
  className?: string;
}

interface RegionItemProps {
  region: KoreaRegionRegion & { districts: string[] };
  value: RegionSelection;
  onChange: (next: RegionSelection) => void;
}

function RegionItem({ region: r, value, onChange }: RegionItemProps) {
  const [open, setOpen] = useState(false);

  // Content scroll detection (prevents item selection when scrolling inside dropdown)
  const didScrollRef = useRef(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  // Trigger scroll detection (prevents dropdown from opening when scrolling the list)
  const triggerDidScrollRef = useRef(false);
  const triggerStartPosRef = useRef<{ x: number; y: number } | null>(null);

  const selectedDistricts = (value ?? [])
    .filter((s) => s.province === r.name)
    .map((s) => s.district);

  const hasSelection = selectedDistricts.length > 0;

  return (
    <li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          className={cn(triggerClass, hasSelection && triggerSelectedClass)}
          onPointerDown={(e) => {
            triggerStartPosRef.current = { x: e.clientX, y: e.clientY };
            triggerDidScrollRef.current = false;
            // Prevent Radix from opening on pointerdown — we open manually in onClick
            e.preventDefault();
          }}
          onPointerMove={(e) => {
            if (!triggerStartPosRef.current || triggerDidScrollRef.current) return;
            const dy = Math.abs(e.clientY - triggerStartPosRef.current.y);
            if (dy > 8) triggerDidScrollRef.current = true;
          }}
          onClick={() => {
            if (!triggerDidScrollRef.current) {
              setOpen((prev) => !prev);
            }
          }}
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
          onPointerDown={(e) => {
            startPosRef.current = { x: e.clientX, y: e.clientY };
            didScrollRef.current = false;
          }}
          onPointerMove={(e) => {
            if (!startPosRef.current || didScrollRef.current) return;
            const dx = e.clientX - startPosRef.current.x;
            const dy = e.clientY - startPosRef.current.y;
            if (dx * dx + dy * dy > 25) didScrollRef.current = true;
          }}
        >
          <DropdownMenuGroup>
            {r.districts.map((district) => (
              <DropdownMenuCheckboxItem
                key={district}
                checked={selectedDistricts.includes(district)}
                className="hover:bg-accent cursor-pointer py-3 text-base transition-colors md:py-1"
                onSelect={(e) => {
                  if (didScrollRef.current) e.preventDefault();
                }}
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
      {sortedRegions.map((r) => (
        <RegionItem key={r.id} region={r} value={value} onChange={onChange} />
      ))}
    </ul>
  );
}
