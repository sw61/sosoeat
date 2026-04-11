import { useQuery } from '@tanstack/react-query';

import { fetchClient } from '@/shared/api/fetch-client';
import { useDebounce } from '@/shared/lib/use-debounce';

import type { LocationSearchResult } from '../model/location.types';
import { locationKeys } from '../model/location-keys';

const DEBOUNCE_MS = 300;

interface LocationSearchApiItem {
  placeName: string;
  addressName: string;
  x: string;
  y: string;
  region1: string;
  region2: string;
}

const searchLocation = async (query: string): Promise<LocationSearchResult[]> => {
  const response = await fetchClient.get(`/api/location/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('장소 검색에 실패했습니다.');

  const data: LocationSearchApiItem[] = await response.json();
  return data.map((item) => ({
    placeName: item.placeName,
    addressName: item.addressName,
    latitude: parseFloat(item.y),
    longitude: parseFloat(item.x),
    region1: item.region1,
    region2: item.region2,
  }));
};

export const useSearchLocation = (query: string) => {
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  return useQuery({
    queryKey: locationKeys.search(debouncedQuery),
    queryFn: () => searchLocation(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 60_000,
  });
};
