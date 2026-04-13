export const CATEGORY_OPTIONS = [
  { value: 'groupEat', label: '함께먹기' },
  { value: 'groupBuy', label: '공동구매' },
] as const;

/** 카테고리 기재 문구 */
export const MEETING_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORY_OPTIONS.map(({ value, label }) => [value, label])
);
