'use client';

import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { startOfDay, startOfMinute } from 'date-fns';
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing';

import { useSearchInfiniteOptions } from './use-search-infinite-options';
import useSearchState from './use-search-state';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
  useQueries: jest.fn(() => []),
}));

const makeQueryResult = (
  data: { data: unknown[]; hasMore: boolean; nextCursor: string },
  dataUpdatedAt = Date.now()
) => ({
  data,
  isLoading: false,
  isError: false,
  isFetching: false,
  dataUpdatedAt,
});

const getDefaultSearchDateStartIso = (now = new Date()) => startOfMinute(now).toISOString();

const renderHookWithClient = (hook: () => ReturnType<typeof useSearchState>) => {
  return renderHook(hook, {
    wrapper: withNuqsTestingAdapter({ searchParams: {} }),
  });
};

describe('useSearchState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      hasNextPage: false,
      isFetching: false,
      fetchNextPage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('handleRegionChange일 때 상태가 업데이트되어야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleRegionChange([{ province: '서울', district: '강남구' }]);
    });

    expect(result.current.regionCommitted).toEqual([{ province: '서울', district: '강남구' }]);
  });

  it('handleDateChange에서 값이 모두 없으면 날짜 상태를 초기화해야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));
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
    const { result } = renderHookWithClient(() => useSearchState(null));
    const startDate = new Date('2026-04-06T10:30:00');

    act(() => {
      result.current.handleDateChange({ valueStart: startDate, valueEnd: null });
    });

    expect(result.current.dateStart).toEqual(startOfDay(startDate));
    expect(result.current.dateEnd).toEqual(startDate);
  });

  it('handleDateChange에서 종료일만 있으면 종료일 기준으로 상태를 업데이트해야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));
    const endDate = new Date('2026-04-08T18:00:00');

    act(() => {
      result.current.handleDateChange({ valueStart: null, valueEnd: endDate });
    });

    expect(result.current.dateStart).toEqual(startOfDay(endDate));
    expect(result.current.dateEnd).toEqual(endDate);
  });

  it('handleTypeFilterChange일 때 타입 필터가 업데이트되어야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleTypeFilterChange('groupBuy');
    });

    expect(result.current.typeFilter).toBe('groupBuy');
  });

  it('handleSortChange일 때 정렬 기준과 순서가 업데이트되어야 한다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

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

    const { result } = renderHookWithClient(() => useSearchState(null));

    expect(result.current.meetingData).toHaveLength(3);
    expect(result.current.meetingData.map((m: { id: number }) => m.id)).toEqual([1, 2, 3]);
  });

  it('dateStart가 없으면 전달된 기본 시작 시각을 사용한다', () => {
    const initialDefaultDateStartIso = getDefaultSearchDateStartIso(
      new Date('2026-04-15T09:00:45')
    );

    renderHookWithClient(() => useSearchState(null, initialDefaultDateStartIso));

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        queryKey: [
          'search',
          'infinite-list',
          expect.objectContaining({
            dateStart: new Date(initialDefaultDateStartIso),
          }),
        ],
      })
    );
  });

  it('검색 조건이 바뀌면 초기 서버 데이터를 다시 주입하지 않는다', async () => {
    const initialData = {
      data: [{ id: 99 }],
      nextCursor: '',
      hasMore: false,
    };
    const initialDefaultDateStartIso = getDefaultSearchDateStartIso(
      new Date('2026-04-15T09:00:45')
    );

    const { result } = renderHookWithClient(() =>
      useSearchState(initialData as never, initialDefaultDateStartIso)
    );

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        initialData: { pages: [initialData], pageParams: [undefined] },
      })
    );

    act(() => {
      result.current.handleSearchQueryChange('김칠수');
    });

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        initialData: undefined,
      })
    );
  });

  it('1글자 입력 시 searchError가 반환된다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleSearchQueryChange('김');
    });

    expect(result.current.searchError).toBe('2글자 이상 입력해주세요');
  });

  it('2글자 이상 입력 시 searchError가 undefined다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleSearchQueryChange('김칠');
    });

    expect(result.current.searchError).toBeUndefined();
  });

  it('0글자일 때 searchError가 undefined다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    expect(result.current.searchError).toBeUndefined();
  });

  it('1글자 입력 후 600ms 경과해도 API keyword가 전달되지 않는다', async () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleSearchQueryChange('김');
    });

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        queryKey: ['search', 'infinite-list', expect.objectContaining({ keyword: undefined })],
      })
    );
  });

  it('dateStart가 없으면 전달된 기본 시작 시각을 사용한다', () => {
    const initialDefaultDateStartIso = getDefaultSearchDateStartIso(
      new Date('2026-04-15T09:00:45')
    );

    renderHookWithClient(() => useSearchState(null, initialDefaultDateStartIso));

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        queryKey: [
          'search',
          'infinite-list',
          expect.objectContaining({
            dateStart: new Date(initialDefaultDateStartIso),
          }),
        ],
      })
    );
  });

  it('검색 조건이 바뀌면 초기 서버 데이터를 다시 주입하지 않는다', async () => {
    const initialData = {
      data: [{ id: 99 }],
      nextCursor: '',
      hasMore: false,
    };
    const initialDefaultDateStartIso = getDefaultSearchDateStartIso(
      new Date('2026-04-15T09:00:45')
    );

    const { result } = renderHookWithClient(() =>
      useSearchState(initialData as never, initialDefaultDateStartIso)
    );

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        initialData: { pages: [initialData], pageParams: [undefined] },
      })
    );

    act(() => {
      result.current.handleSearchQueryChange('김칠수');
    });

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        initialData: undefined,
      })
    );
  });

  it('1글자 입력 시 searchError가 반환된다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleSearchQueryChange('김');
    });

    expect(result.current.searchError).toBe('2글자 이상 입력해주세요');
  });

  it('2글자 이상 입력 시 searchError가 undefined다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleSearchQueryChange('김칠');
    });

    expect(result.current.searchError).toBeUndefined();
  });

  it('0글자일 때 searchError가 undefined다', () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    expect(result.current.searchError).toBeUndefined();
  });

  it('1글자 입력 후 600ms 경과해도 API keyword가 전달되지 않는다', async () => {
    const { result } = renderHookWithClient(() => useSearchState(null));

    act(() => {
      result.current.handleSearchQueryChange('김');
    });

    await act(async () => {
      jest.advanceTimersByTime(600);
    });

    expect(useInfiniteQuery).toHaveBeenLastCalledWith(
      expect.objectContaining({
        queryKey: ['search', 'infinite-list', expect.objectContaining({ keyword: undefined })],
      })
    );
  });

  it('복수 지역 데이터를 합산하여 반환해야 한다', async () => {
    const meeting1 = { id: 1, region: '부산 북구', dateTime: '2026-01-01' };
    const meeting2 = { id: 2, region: '서울 강남구', dateTime: '2026-01-02' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting1], hasMore: false, nextCursor: '' }),
      makeQueryResult({ data: [meeting2], hasMore: false, nextCursor: '' }, Date.now() + 1),
    ]);

    const { result } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산 북구', '서울 강남구'] })
    );

    await act(async () => {});

    const ids = result.current.data.pages[0].data.map((m) => (m as { id: number }).id);
    expect(ids).toHaveLength(2);
    expect(ids).toContain(1);
    expect(ids).toContain(2);
  });

  it('빈 결과여도 processedRef 충돌 없이 독립적으로 처리해야 한다', async () => {
    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [], hasMore: false, nextCursor: '' }),
      makeQueryResult({ data: [], hasMore: false, nextCursor: '' }, Date.now() + 1),
    ]);

    const { result } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산 북구', '서울 강남구'] })
    );

    await act(async () => {});

    expect(result.current.data.pages[0].data).toHaveLength(0);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('동일한 dataUpdatedAt으로 들어온 데이터는 중복 append하지 않아야 한다', async () => {
    const meeting = { id: 1, region: '부산 북구' };
    const ts = Date.now();

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting], hasMore: false, nextCursor: '' }, ts),
    ]);

    const { result, rerender } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산 북구'] })
    );

    await act(async () => {});
    expect(result.current.data.pages[0].data).toHaveLength(1);

    rerender();
    expect(result.current.data.pages[0].data).toHaveLength(1);
  });

  it('region이 바뀌면 이전 지역 데이터를 초기화해야 한다', async () => {
    const meeting1 = { id: 1, region: '부산 북구' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting1], hasMore: false, nextCursor: '' }),
    ]);

    const { result, rerender } = renderHook(
      ({ region }: { region: string[] }) => useSearchInfiniteOptions({ region }),
      { initialProps: { region: ['부산 북구'] } }
    );

    await act(async () => {});
    expect(result.current.data.pages[0].data).toHaveLength(1);

    const meeting2 = { id: 2, region: '서울 강남구' };
    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting2], hasMore: false, nextCursor: '' }, Date.now() + 100),
    ]);

    rerender({ region: ['서울 강남구'] });
    await act(async () => {});

    const ids = result.current.data.pages[0].data.map((m) => (m as { id: number }).id);
    expect(ids).not.toContain(1);
    expect(ids).toContain(2);
  });

  it('한 지역만 hasMore가 true여도 hasNextPage가 true를 반환해야 한다', async () => {
    const meeting1 = { id: 1, region: '부산 북구' };
    const meeting2 = { id: 2, region: '서울 강남구' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting1], hasMore: true, nextCursor: 'cursor-a' }),
      makeQueryResult({ data: [meeting2], hasMore: false, nextCursor: '' }, Date.now() + 1),
    ]);

    const { result } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산 북구', '서울 강남구'] })
    );

    await act(async () => {});

    expect(result.current.hasNextPage).toBe(true);
  });

  it('복수 지역 선택 중 type 필터 변경 시 이전 데이터를 초기화해야 한다', async () => {
    const meetingAll1 = { id: 1, region: '부산 북구', type: 'groupEat' };
    const meetingAll2 = { id: 2, region: '서울 강남구', type: 'groupBuy' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meetingAll1], hasMore: false, nextCursor: '' }, 1000),
      makeQueryResult({ data: [meetingAll2], hasMore: false, nextCursor: '' }, 1001),
    ]);

    const { result, rerender } = renderHook(
      ({ type }: { type?: string }) =>
        useSearchInfiniteOptions({ region: ['부산 북구', '서울 강남구'], type: type as never }),
      { initialProps: { type: undefined as string | undefined } }
    );

    await act(async () => {});
    expect(result.current.data.pages[0].data).toHaveLength(2);

    // type 필터 변경: groupEat 만 보여야 함
    const meetingFiltered = { id: 1, region: '부산 북구', type: 'groupEat' };
    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meetingFiltered], hasMore: false, nextCursor: '' }, 2000),
      makeQueryResult({ data: [], hasMore: false, nextCursor: '' }, 2001),
    ]);

    rerender({ type: 'groupEat' });
    await act(async () => {});

    const ids = result.current.data.pages[0].data.map((m) => (m as { id: number }).id);
    // 이전 데이터(id:2, groupBuy)가 남아있으면 안 됨
    expect(ids).not.toContain(2);
    expect(ids).toContain(1);
    expect(result.current.data.pages[0].data).toHaveLength(1);
  });

  it('복수 지역 선택 중 type 필터 변경 시 데이터가 중복되지 않아야 한다', async () => {
    const meeting = { id: 1, region: '부산 북구' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting], hasMore: false, nextCursor: '' }, 1000),
      makeQueryResult({ data: [], hasMore: false, nextCursor: '' }, 1001),
    ]);

    const { result, rerender } = renderHook(
      ({ type }: { type?: string }) =>
        useSearchInfiniteOptions({ region: ['부산 북구', '서울 강남구'], type: type as never }),
      { initialProps: { type: undefined as string | undefined } }
    );

    await act(async () => {});
    expect(result.current.data.pages[0].data).toHaveLength(1);

    // 같은 meeting이 새 필터에서도 반환되는 경우 중복 없어야 함
    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting], hasMore: false, nextCursor: '' }, 2000),
      makeQueryResult({ data: [], hasMore: false, nextCursor: '' }, 2001),
    ]);

    rerender({ type: 'groupBuy' });
    await act(async () => {});

    expect(result.current.data.pages[0].data).toHaveLength(1);
  });
});
