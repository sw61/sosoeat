import type { DropdownSubProp } from '@/shared/ui/dropdown-sub/dropdown-sub.types';

import type { RegionModalDropdownSub, RegionSelection } from '../region-select-modal.types';

export function selectionToRecord(s: RegionSelection): Record<string, string> {
  if (s == null || s.length === 0) return {};
  return Object.fromEntries(s.map(({ province, district }) => [province, district]));
}

export function recordToSelection(r: Record<string, string>): RegionSelection {
  const entries = Object.entries(r);
  if (entries.length === 0) return null;
  return entries.map(([province, district]) => ({ province, district }));
}

export function omitRegionModalValueOnChange(
  sub: RegionModalDropdownSub
): Omit<DropdownSubProp, 'value' | 'onChange'> {
  const { data, triggerClassName, contentClassName, itemClassName } = sub;
  return { data, triggerClassName, contentClassName, itemClassName };
}
