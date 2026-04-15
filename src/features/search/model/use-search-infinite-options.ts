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
  payloads: MergePayload[];
};

const initialSearchInfiniteState: SearchInfiniteState = {
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

      const lastPayload = action.payloads[action.payloads.length - 1];
      const nextHasMoreByRegion = { ...state.hasMoreByRegion };

      action.payloads.forEach(({ requestKey, nextHasMore }) => {
        nextHasMoreByRegion[requestKey] = nextHasMore;
      });

      return {
        accumulated: lastPayload.nextAccumulated,
        hasMoreByRegion: nextHasMoreByRegion,
      };
    }
  }
}

export const useSearchInfiniteOptions = (options: MeetingSearchOptions) => {
  const regionKey = buildRegionKey(options.region);

  const [cursor, setCursor] = useState<Record<string, string | undefined>>({});
  const [{ hasMoreByRegion, accumulated }, dispatch] = useReducer(
    searchInfiniteReducer,
    initialSearchInfiniteState
  );
  const processedRef = useRef<Set<string>>(new Set());

  const region = options.region;

  const regions = useMemo(() => {
    return Array.isArray(region) ? region : region ? [region] : [];
  }, [region]);

  const queryResults = useQueries({
    queries: Array.isArray(options.region)
      ? regions.map((region) =>
          meetingsQueryOptions.options({
            ...options,
            region,
            cursor: cursor[buildRegionRequestKey(regionKey, region)],
          })
        )
      : [],
  });

  const dataUpdatedKey = queryResults.map((result) => result.dataUpdatedAt).join(',');

  useEffect(() => {
    let nextAccumulated = accumulated;
    const payloads: MergePayload[] = [];

    regions.forEach((region, idx) => {
      const result = queryResults[idx];
      if (!result?.data) return;

      const requestKey = buildRegionRequestKey(regionKey, region);
      const cursorKey = cursor[requestKey] ?? '';
      const processedKey = `${requestKey}:${cursorKey}`;
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
      dispatch({
        type: 'merge-results',
        payloads,
      });
    }
  }, [accumulated, cursor, dataUpdatedKey, queryResults, regionKey, regions]);

  const combinedData = combineRegionMeetings(regions, accumulated, regionKey);
  const sortedMeetings = sortMeetings(combinedData, options.sortBy, options.sortOrder);

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
    isFetchingNextPage: queryResults.some((result) => result.isFetching),
  };
};
