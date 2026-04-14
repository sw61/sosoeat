'use client';
import { useEffect, useRef, useState } from 'react';

import { useQueries } from '@tanstack/react-query';

import { type Meeting, meetingsQueryOptions } from '@/entities/meeting';
import { TeamIdMeetingsGetRequest } from '@/shared/types/generated-client';

type MeetingsOptions = Omit<TeamIdMeetingsGetRequest, 'teamId' | 'region'> & {
  region?: string | string[];
};

//지역이 2개이상일때만 사용
export const useSearchInfiniteOptions = (options: MeetingsOptions) => {
  // regionKey를 상태 키에 인코딩 → region 변경 시 명시적 리셋 불필요
  // (region이 바뀌면 새 키로 접근하므로 이전 데이터가 자동으로 무시됨)
  const regionKey = Array.isArray(options.region)
    ? [...options.region].sort().join(',')
    : (options.region ?? '');

  const rk = (region: string) => `${regionKey}:${region}`;

  const [cursor, setCursor] = useState<Record<string, string | undefined>>({});
  const [hasMoreByRegion, setHasMoreByRegion] = useState<Record<string, boolean>>({});
  const [accumlated, setAccumlated] = useState<Record<string, Array<Meeting>>>({});

  // (regionKey, region, cursor) 기준으로 중복 처리 방지
  const processedRef = useRef<Set<string>>(new Set());

  const regions = Array.isArray(options.region)
    ? options.region
    : options.region
      ? [options.region]
      : [];

  // 지역이 여러 개인 경우, 각 지역별로 개별 쿼리를 실행
  const queryResults = useQueries({
    queries: Array.isArray(options.region)
      ? regions.map((region) =>
          meetingsQueryOptions.options({ ...options, region, cursor: cursor[rk(region)] })
        )
      : [],
  });

  const dataUpdatedKey = queryResults.map((r) => r.dataUpdatedAt).join(',');

  useEffect(() => {
    regions.forEach((region, idx) => {
      const result = queryResults[idx];
      if (!result?.data) return;
      const cursorKey = cursor[rk(region)] ?? '';
      const key = `${rk(region)}:${cursorKey}`;
      if (processedRef.current.has(key)) return;
      processedRef.current.add(key);

      setHasMoreByRegion((prev) => ({
        ...prev,
        [rk(region)]: result.data.hasMore,
      }));
      setAccumlated((prev) => ({
        ...prev,
        [rk(region)]: [...(prev[rk(region)] || []), ...(result.data.data ?? [])],
      }));
    });
  }, [dataUpdatedKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const combinedData = regions.flatMap((region) => accumlated[rk(region)] || []);

  const order = options.sortOrder === 'asc' ? 1 : -1;

  switch (options.sortBy) {
    case 'participantCount':
      combinedData.sort((a, b) => {
        return (a.participantCount - b.participantCount) * order;
      });
      break;

    case 'dateTime':
      combinedData.sort((a, b) => {
        return (new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()) * order;
      });
      break;

    case 'registrationEnd':
      combinedData.sort((a, b) => {
        return (
          (new Date(a.registrationEnd).getTime() - new Date(b.registrationEnd).getTime()) * order
        );
      });
      break;

    default:
      break;
  }

  return {
    data: { pages: [{ data: combinedData, nextCursor: '', hasMore: false }] },
    isLoading: queryResults.some((result) => result.isLoading),
    isError: queryResults.some((result) => result.isError),
    fetchNextPage: () => {
      setCursor((prev) => {
        const next = { ...prev };
        regions.forEach((region, idx) => {
          const result = queryResults[idx];
          if (result?.data && hasMoreByRegion[rk(region)]) {
            next[rk(region)] = result.data.nextCursor;
          }
        });
        return next;
      });
    },
    hasNextPage: regions.some((region) => hasMoreByRegion[rk(region)]),
    isFetching: queryResults.some((result) => result.isFetching),
    isFetchingNextPage: queryResults.some((result) => result.isFetching),
  };
};
