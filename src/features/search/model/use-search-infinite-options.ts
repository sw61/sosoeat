'use client';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { useQueries } from '@tanstack/react-query';

import { type Meeting, type MeetingSearchOptions, meetingsQueryOptions } from '@/entities/meeting';

import {
  buildRegionKey,
  buildRegionRequestKey,
  combineRegionMeetings,
  mergeRegionResult,
} from '../lib/multi-region-search-state';
import { sortMeetings } from '../lib/sort-meetings';

type SearchInfiniteState = {
  scopeKey: string;
  hasMoreByRegion: Record<string, boolean>;
  accumulated: Record<string, Array<Meeting>>;
};

type MergePayload = {
  requestKey: string;
  nextHasMore: boolean;
  nextAccumulated: Record<string, Array<Meeting>>;
};

type SearchInfiniteAction = {
  type: 'merge-results';
  scopeKey: string;
  payloads: MergePayload[];
};

const initialSearchInfiniteState: SearchInfiniteState = {
  scopeKey: '',
  hasMoreByRegion: {},
  accumulated: {},
};

function searchInfiniteReducer(
  state: SearchInfiniteState,
  action: SearchInfiniteAction
): SearchInfiniteState {
  switch (action.type) {
    case 'merge-results': {
      if (action.payloads.length === 0) {
        return state;
      }

      // scope가 바뀌면 이전 accumulated를 버리고 새로 시작
      const base =
        action.scopeKey !== state.scopeKey
          ? { scopeKey: action.scopeKey, hasMoreByRegion: {}, accumulated: {} }
          : state;

      const lastPayload = action.payloads[action.payloads.length - 1];
      const nextHasMoreByRegion = { ...base.hasMoreByRegion };

      action.payloads.forEach(({ requestKey, nextHasMore }) => {
        nextHasMoreByRegion[requestKey] = nextHasMore;
      });

      return {
        scopeKey: action.scopeKey,
        accumulated: lastPayload.nextAccumulated,
        hasMoreByRegion: nextHasMoreByRegion,
      };
    }
  }
}

export const useSearchInfiniteOptions = (options: MeetingSearchOptions, enabled = true) => {
  const regionKey = buildRegionKey(options.region);

  const dateStartIso = options.dateStart?.toISOString();
  const dateEndIso = options.dateEnd?.toISOString();
  const filterSignature = useMemo(
    () =>
      [
        options.type,
        options.sortBy,
        options.sortOrder,
        dateStartIso,
        dateEndIso,
        options.keyword,
      ].join('|'),
    [options.type, options.sortBy, options.sortOrder, dateStartIso, dateEndIso, options.keyword]
  );

  const scopeKey = `${regionKey}|${filterSignature}`;

  const [cursor, setCursor] = useState<Record<string, string | undefined>>({});
  const [{ hasMoreByRegion, accumulated, scopeKey: stateScopeKey }, dispatch] = useReducer(
    searchInfiniteReducer,
    initialSearchInfiniteState
  );
  const processedRef = useRef<Set<string>>(new Set());

  const region = options.region;

  const regions = useMemo(() => {
    return Array.isArray(region) ? region : region ? [region] : [];
  }, [region]);

  const queryResults = useQueries({
    queries:
      Array.isArray(options.region) && enabled
        ? regions.map((region) => ({
            ...meetingsQueryOptions.options({
              ...options,
              region,
              cursor: cursor[buildRegionRequestKey(regionKey, region)],
            }),
            enabled,
          }))
        : [],
  });

  const dataUpdatedKey = queryResults.map((result) => result.dataUpdatedAt).join(',');

  useEffect(() => {
    const isScopeChange = scopeKey !== stateScopeKey;
    // scope 변경 시 processedRef 초기화 — cursor는 이 effect 안에서 무시해 타이밍 경합 방지
    if (isScopeChange) {
      processedRef.current = new Set();
    }

    let nextAccumulated = isScopeChange ? {} : accumulated;
    const payloads: MergePayload[] = [];

    regions.forEach((region, idx) => {
      const result = queryResults[idx];
      if (!result?.data) return;

      const requestKey = buildRegionRequestKey(regionKey, region);
      // scope 변경 시 cursor를 강제로 '' 사용 — 비동기 cursor 리셋으로 인한 이중 dispatch 방지
      const cursorKey = isScopeChange ? '' : (cursor[requestKey] ?? '');
      const processedKey = `${scopeKey}:${requestKey}:${cursorKey}`;
      if (processedRef.current.has(processedKey)) return;
      processedRef.current.add(processedKey);

      const merged = mergeRegionResult({
        accumulated: nextAccumulated,
        regionKey,
        region,
        result: result.data,
      });

      nextAccumulated = merged.nextAccumulated;
      payloads.push({
        requestKey,
        nextHasMore: merged.nextHasMore,
        nextAccumulated,
      });
    });

    if (payloads.length > 0) {
      dispatch({ type: 'merge-results', scopeKey, payloads });
    }
  }, [
    accumulated,
    cursor,
    dataUpdatedKey,
    queryResults,
    regionKey,
    regions,
    scopeKey,
    stateScopeKey,
  ]);

  const combinedData = useMemo(
    () =>
      stateScopeKey === scopeKey ? combineRegionMeetings(regions, accumulated, regionKey) : [],
    [regions, accumulated, regionKey, stateScopeKey, scopeKey]
  );
  const sortedMeetings = useMemo(
    () => sortMeetings(combinedData, options.sortBy, options.sortOrder),
    [combinedData, options.sortBy, options.sortOrder]
  );

  return {
    data: { pages: [{ data: sortedMeetings, nextCursor: '', hasMore: false }] },
    isLoading: queryResults.some((result) => result.isLoading),
    isError: queryResults.some((result) => result.isError),
    fetchNextPage: () => {
      setCursor((prev) => {
        const next = { ...prev };
        regions.forEach((region, idx) => {
          const result = queryResults[idx];
          const requestKey = buildRegionRequestKey(regionKey, region);
          if (result?.data && hasMoreByRegion[requestKey]) {
            next[requestKey] = result.data.nextCursor;
          }
        });
        return next;
      });
    },
    hasNextPage: regions.some(
      (region) => hasMoreByRegion[buildRegionRequestKey(regionKey, region)]
    ),
    isFetching: queryResults.some((result) => result.isFetching),
    isFetchingNextPage: queryResults.some((result, idx) => {
      const region = regions[idx];
      const requestKey = buildRegionRequestKey(regionKey, region);
      return result.isFetching && !!cursor[requestKey];
    }),
  };
};
