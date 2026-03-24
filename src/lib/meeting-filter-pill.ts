import { cn } from '@/lib/utils';

/**
 * 피그마 Filter pill (날짜·지역·정렬) — padding 4×8, h 32, gap 2px, gray/600 본문 #8E8E8E
 * @see theme `--sosoeat-gray-600`
 */
export const meetingFilterPillTriggerClass =
  'inline-flex h-8 cursor-pointer items-center justify-center gap-0.5 rounded-md border-0 bg-transparent px-2 py-1 text-base font-medium leading-6 tracking-[-0.02em] shadow-none [-webkit-tap-highlight-color:transparent] transition-none hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-sosoeat-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none active:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:active:bg-transparent';

/** 피그마 gray/600 — 트리거 기본 라벨·chevron */
export const meetingFilterPillLabelIdleClass = 'text-sosoeat-gray-600';

/** 선택됨 시 gray/800 (#3C3C3C) — 탭 비선택 라벨과 동일 톤 */
export const meetingFilterPillLabelActiveClass = 'text-sosoeat-gray-800';

export function meetingFilterPillLabelClass(hasValue: boolean) {
  return cn(hasValue ? meetingFilterPillLabelActiveClass : meetingFilterPillLabelIdleClass);
}
