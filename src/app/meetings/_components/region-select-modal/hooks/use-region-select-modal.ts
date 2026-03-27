'use client';

import { useCallback, useState } from 'react';

import type {
  RegionModalDropdownSub,
  RegionSelection,
  RegionSelectModalProps,
} from '../region-select-modal.types';

import { UseRegionSelectModalParams } from './use-region-select-modal.types';

export function useRegionSelectModal({
  dropdownSub,
  regionCascade,
  draftValueProp,
  onDraftChange,
}: UseRegionSelectModalParams) {
  const draftControlled = draftValueProp !== undefined && onDraftChange !== undefined;

  const [open, setOpen] = useState(false);
  const [internalDraft, setInternalDraft] = useState<RegionSelection>(null);

  const draftValue = draftControlled ? draftValueProp : internalDraft;

  const setDraft = (draft: RegionSelection) => {
    if (draftControlled) {
      onDraftChange(draft);
    } else {
      setInternalDraft(draft);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) return;
    if (dropdownSub != null) {
      const v = dropdownSub.value;
      const seed = v == null ? null : { province: v.province, district: v.district };
      setDraft(seed);
    } else {
      setDraft(null);
    }
  };

  const showCascade = regionCascade != null && dropdownSub != null;

  const handleConfirm = () => {
    if (dropdownSub != null) {
      dropdownSub.onChange(draftValue);
    }
    setOpen(false);
  };

  return {
    open,
    draftValue,
    setDraft,
    handleOpenChange,
    handleConfirm,
    showCascade,
  };
}
