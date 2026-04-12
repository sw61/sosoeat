import { MapPin } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import type { LocationSearchResult } from '../model/location.types';

interface LocationResultItemProps {
  result: LocationSearchResult;
  isSelected: boolean;
  onClick: (result: LocationSearchResult) => void;
}

export function LocationResultItem({ result, isSelected, onClick }: LocationResultItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(result)}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors',
        isSelected
          ? 'bg-sosoeat-orange-50 ring-sosoeat-orange-500 ring-1'
          : 'hover:bg-sosoeat-gray-100'
      )}
    >
      <MapPin
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          isSelected ? 'text-sosoeat-orange-500' : 'text-sosoeat-gray-500'
        )}
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm font-medium',
            isSelected ? 'text-sosoeat-orange-600' : 'text-sosoeat-gray-900'
          )}
        >
          {result.placeName}
        </p>
        <p className="text-sosoeat-gray-500 mt-0.5 truncate text-xs">{result.addressName}</p>
      </div>
    </button>
  );
}
