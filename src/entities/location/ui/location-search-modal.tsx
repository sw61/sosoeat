'use client';

import { ResponsiveModal } from '@/shared/ui/responsive-modal/responsive-modal';

import type { LocationSearchModalProps } from '../model/location-search.types';

import { LocationSearchView } from './location-search-view';

export function LocationSearchModal({
  open,
  onClose,
  onSelect,
  mapClassName,
}: LocationSearchModalProps) {
  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title="장소 검색"
      className="h-[80dvh] md:h-[600px]"
    >
      <LocationSearchView onClose={onClose} onSelect={onSelect} mapClassName={mapClassName} />
    </ResponsiveModal>
  );
}
