'use client';

import { useState } from 'react';

import { Loader2, Search } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input/input';

import { useSearchLocation } from './api/use-search-location';
import type { LocationSearchModalProps, LocationSearchResult } from './model/location-search.types';
import { LocationMapPreview } from './location-map-preview';
import { LocationResultItem } from './location-result-item';

type LocationSearchViewProps = Omit<LocationSearchModalProps, 'open'>;

export function LocationSearchView({ onClose, onSelect }: LocationSearchViewProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<LocationSearchResult | null>(null);

  const { data: results, isFetching, isError } = useSearchLocation(query);

  const hasQuery = query.trim().length > 0;
  const hasResults = results && results.length > 0;

  const handleConfirm = () => {
    if (selected) onSelect(selected);
  };

  const handleResultClick = (result: LocationSearchResult) => {
    setSelected(result);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* 검색 입력 */}
      <div className="relative px-4 pt-4 pb-3 md:px-6 md:pt-6">
        <Input
          placeholder="건물, 지번 또는 도로명 검색"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
          }}
          className="h-10 pr-10 text-sm md:h-12 md:text-base"
          autoFocus
        />
        <span className="text-sosoeat-gray-500 pointer-events-none absolute top-4 right-7 flex h-10 items-center md:top-6 md:right-9 md:h-12">
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </span>
      </div>

      {/* 지도 미리보기 - 항상 검색 결과와 동시에 보임 */}
      {selected && (
        <div className="px-4 pb-2 md:px-6">
          <LocationMapPreview
            latitude={selected.latitude}
            longitude={selected.longitude}
            className="h-32 md:h-40"
          />
        </div>
      )}

      {/* 결과 목록 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 md:px-6">
        {!hasQuery && (
          <p className="text-sosoeat-gray-500 py-8 text-center text-sm">검색어를 입력해 주세요.</p>
        )}

        {hasQuery && !isFetching && isError && (
          <p className="text-destructive py-8 text-center text-sm">장소 검색에 실패했습니다.</p>
        )}

        {hasQuery && !isFetching && !isError && !hasResults && (
          <p className="text-sosoeat-gray-500 py-8 text-center text-sm">검색 결과가 없습니다.</p>
        )}

        {hasResults && (
          <ul className="flex flex-col gap-1 py-1">
            {results.map((result) => (
              <li key={`${result.addressName}-${result.latitude}-${result.longitude}`}>
                <LocationResultItem
                  result={result}
                  isSelected={
                    selected?.latitude === result.latitude &&
                    selected?.longitude === result.longitude
                  }
                  onClick={handleResultClick}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-3 px-4 pt-4 pb-6 md:px-6 md:pb-8">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-sosoeat-gray-300 text-sosoeat-gray-700 h-12 flex-1 rounded-xl text-sm font-semibold md:h-[60px] md:rounded-2xl md:text-base"
        >
          취소
        </Button>
        <Button
          type="button"
          disabled={!selected}
          onClick={handleConfirm}
          className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 disabled:bg-sosoeat-gray-300 disabled:text-sosoeat-gray-500 h-12 flex-1 rounded-xl text-sm font-semibold text-white md:h-[60px] md:rounded-2xl md:text-base"
        >
          이 장소로 선택
        </Button>
      </div>
    </div>
  );
}
