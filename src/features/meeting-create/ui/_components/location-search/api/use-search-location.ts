import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { LocationSearchResult } from '../model/location-search.types';

const DEBOUNCE_MS = 300;

async function searchLocation(query: string): Promise<LocationSearchResult[]> {
  const response = await fetch(`/api/location/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('장소 검색에 실패했습니다.');

  const data = await response.json();
  return data.map(
    (item: {
      placeName: string;
      addressName: string;
      x: string;
      y: string;
      region1: string;
      region2: string;
    }) => ({
      placeName: item.placeName,
      addressName: item.addressName,
      latitude: parseFloat(item.y),
      longitude: parseFloat(item.x),
      region1: item.region1,
      region2: item.region2,
    })
  );
}

export function useSearchLocation(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ['location-search', debouncedQuery],
    queryFn: () => searchLocation(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 60_000,
  });
}
