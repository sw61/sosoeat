/**
 * DateBadge
 * 모바일 카드 상단의 날짜 뱃지 컴포넌트.
 * category에 따라 오렌지(groupEat) / 블루(groupBuy) 색상으로 분기됩니다.
 *
 * 위치: src/components/common/date-badge/date-badge.tsx
 *
 * @example
 * <DateBadge date={meeting.dateTime} category={meeting.type} />
 */

import { cva } from 'class-variance-authority';
import { format } from 'date-fns';

import { cn } from '@/shared/lib/utils';
import type { MeetingCategory } from '@/shared/types/meeting';

// ── variants ─────────────────────────────────────────────────

const dateBadgeVariants = cva(
  'inline-flex h-[20px] items-center justify-center rounded-full border px-2 text-xs font-medium',
  {
    variants: {
      category: {
        groupEat: 'border-sosoeat-orange-600 bg-sosoeat-orange-100 text-sosoeat-orange-700',
        groupBuy: 'border-sosoeat-blue-600 bg-sosoeat-blue-100 text-sosoeat-blue-700',
      },
    },
  }
);

// 시간 뱃지는 항상 뉴트럴 색상 — variant 불필요
const timeBadgeClass =
  'inline-flex h-[20px] items-center justify-center rounded-full border border-sosoeat-gray-500 bg-white px-2 text-xs font-medium text-sosoeat-gray-700';

// ── Props ─────────────────────────────────────────────────────

interface DateBadgeProps {
  /** ISO 날짜 문자열 또는 Date 객체 */
  date: string | Date;
  category: MeetingCategory;
  className?: string;
}

interface TimeBadgeProps {
  date: string | Date;
  className?: string;
}

// ── 컴포넌트 ──────────────────────────────────────────────────

/** 날짜 뱃지 (M월 d일 형식, 카테고리 색상) */
export function DateBadge({ date, category, className }: DateBadgeProps) {
  const label = format(new Date(date), 'M월 d일');
  return <span className={cn(dateBadgeVariants({ category }), className)}>{label}</span>;
}

/** 시간 뱃지 (HH:mm 형식, 항상 뉴트럴 색상) */
export function TimeBadge({ date, className }: TimeBadgeProps) {
  const label = format(new Date(date), 'HH:mm');
  return <span className={cn(timeBadgeClass, className)}>{label}</span>;
}
