import type { DropdownSubProp } from '@/components/common/dropdown-sub';

import type { RegionModalDropdownSub, RegionSelection } from '../region-select-modal.types';

export function selectionToRecord(s: RegionSelection): Record<string, string> {
  if (s == null) return {};
  return { [s.province]: s.district };
}

export function recordToSelection(r: Record<string, string>): RegionSelection {
  const keys = Object.keys(r).sort();
  if (keys.length === 0) return null;
  return { province: keys[0], district: r[keys[0]]! };
}

export function omitRegionModalValueOnChange(
  sub: RegionModalDropdownSub
): Omit<DropdownSubProp, 'value' | 'onChange'> {
  const { value: _v, onChange: _o, ...rest } = sub;
  return rest;
}
