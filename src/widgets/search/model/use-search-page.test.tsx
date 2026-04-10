'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { startOfDay } from 'date-fns';
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing';

import useSearchPage from './use-search-page';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
  useQueries: jest.fn(() => []),
}));

const renderHookWithClient = (hook: () => ReturnType<typeof useSearchPage>) => {
  return renderHook(hook, {
    wrapper: withNuqsTestingAdapter({ searchParams: {} }),
  });
};

describe('useSearchPage', () => {
  beforeEach(() => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      hasNextPage: false,
      isFetching: false,
      fetchNextPage: jest.fn(),
    });
  });

  it('handleRegionChange일 때 상태가 업데이트되어야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchPage());

    act(() => {
      result.current.handleRegionChange([{ province: '서울', district: '강남구' }]);
    });

    expect(result.current.regionCommitted).toEqual([{ province: '서울', district: '강남구' }]);
  });

  it('handleDateChange에서 값이 모두 없으면 날짜 상태를 초기화해야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchPage());
    const startDate = new Date('2026-04-06T10:30:00');
    const endDate = new Date('2026-04-08T18:00:00');

    act(() => {
      result.current.handleDateChange({ valueStart: startDate, valueEnd: endDate });
    });

    act(() => {
      result.current.handleDateChange({ valueStart: null, valueEnd: null });
    });

    expect(result.current.dateStart).toBeNull();
    expect(result.current.dateEnd).toBeNull();
  });

  it('handleDateChange에서 시작일만 있으면 시작일 기준으로 상태를 업데이트해야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchPage());
    const startDate = new Date('2026-04-06T10:30:00');

    act(() => {
      result.current.handleDateChange({ valueStart: startDate, valueEnd: null });
    });

    expect(result.current.dateStart).toEqual(startOfDay(startDate));
    expect(result.current.dateEnd).toEqual(startDate);
  });

  it('handleDateChange에서 종료일만 있으면 종료일 기준으로 상태를 업데이트해야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchPage());
    const endDate = new Date('2026-04-08T18:00:00');

    act(() => {
      result.current.handleDateChange({ valueStart: null, valueEnd: endDate });
    });

    expect(result.current.dateStart).toEqual(startOfDay(endDate));
    expect(result.current.dateEnd).toEqual(endDate);
  });

  it('handleTypeFilterChange일 때 타입 필터가 업데이트되어야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchPage());

    act(() => {
      result.current.handleTypeFilterChange('groupBuy');
    });

    expect(result.current.typeFilter).toBe('groupBuy');
  });

  it('handleSortChange일 때 정렬 기준과 순서가 업데이트되어야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchPage());

    act(() => {
      result.current.handleSortChange('dateTime', 'desc');
    });

    expect(result.current.sortBy).toBe('dateTime');
    expect(result.current.sortOrder).toBe('desc');
  });

  it('pages 데이터를 flatMap하여 meetingData를 반환해야 한다', () => {
    const page1 = { data: [{ id: 1 }, { id: 2 }], nextCursor: 'c1', hasMore: true };
    const page2 = { data: [{ id: 3 }], nextCursor: '', hasMore: false };

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [page1, page2], pageParams: [undefined, 'c1'] },
      isLoading: false,
      isError: false,
      hasNextPage: false,
      isFetching: false,
      fetchNextPage: jest.fn(),
    });

    const { result } = renderHookWithClient(() => useSearchPage());

    expect(result.current.meetingData).toHaveLength(3);
    expect(result.current.meetingData.map((m) => m.id)).toEqual([1, 2, 3]);
  });
});
