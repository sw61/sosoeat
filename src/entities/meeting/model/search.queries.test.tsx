'use client';

import { useQueries } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import { useSearchInfiniteOptions } from './search.queries';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueries: jest.fn(),
  useQuery: jest.fn(),
  useInfiniteQuery: jest.fn(),
}));

jest.mock('./meetings.options', () => ({
  meetingsQueryOptions: {
    options: (opts: unknown) => ({ queryKey: ['search', 'list', opts], queryFn: jest.fn() }),
    all: () => ({ queryKey: ['search'], queryFn: jest.fn() }),
    detail: (id: number) => ({ queryKey: ['search', 'detail', id], queryFn: jest.fn() }),
    infiniteOptions: (opts: unknown) => ({
      queryKey: ['search', 'infinite-list', opts],
      queryFn: jest.fn(),
    }),
  },
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

describe('useSearchInfiniteOptions', () => {
  beforeEach(() => {
    (useQueries as jest.Mock).mockReturnValue([]);
  });

  it('복수 지역 데이터를 합산하여 반환해야 한다', async () => {
    const meeting1 = { id: 1, region: '부산광역시 북구', dateTime: '2026-01-01' };
    const meeting2 = { id: 2, region: '서울특별시 강남구', dateTime: '2026-01-02' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting1], hasMore: false, nextCursor: '' }),
      makeQueryResult({ data: [meeting2], hasMore: false, nextCursor: '' }, Date.now() + 1),
    ]);

    const { result } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산광역시 북구', '서울특별시 강남구'] })
    );

    await act(async () => {});

    const ids = result.current.data.pages[0].data.map((m) => (m as { id: number }).id);
    expect(ids).toHaveLength(2);
    expect(ids).toContain(1);
    expect(ids).toContain(2);
  });

  it('두 지역 모두 빈 결과일 때 processedRef 충돌 없이 독립적으로 처리해야 한다', async () => {
    // 이전 버그: 두 번째 빈 결과가 processedRef의 'unknown:' 키로 스킵됨
    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [], hasMore: false, nextCursor: '' }),
      makeQueryResult({ data: [], hasMore: false, nextCursor: '' }, Date.now() + 1),
    ]);

    const { result } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산광역시 북구', '서울특별시 강남구'] })
    );

    await act(async () => {});

    expect(result.current.data.pages[0].data).toHaveLength(0);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('동일한 dataUpdatedAt으로 재렌더 시 데이터를 중복 append하지 않아야 한다', async () => {
    const meeting = { id: 1, region: '부산광역시 북구' };
    const ts = Date.now();

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting], hasMore: false, nextCursor: '' }, ts),
    ]);

    const { result, rerender } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산광역시 북구'] })
    );

    await act(async () => {});
    expect(result.current.data.pages[0].data).toHaveLength(1);

    // 같은 dataUpdatedAt으로 재렌더 → processedRef가 스킵하여 append 안됨
    rerender();
    expect(result.current.data.pages[0].data).toHaveLength(1);
  });

  it('region이 바뀌면 이전 지역 데이터를 초기화해야 한다', async () => {
    const meeting1 = { id: 1, region: '부산광역시 북구' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting1], hasMore: false, nextCursor: '' }),
    ]);

    const { result, rerender } = renderHook(
      ({ region }: { region: string[] }) => useSearchInfiniteOptions({ region }),
      { initialProps: { region: ['부산광역시 북구'] } }
    );

    await act(async () => {});
    expect(result.current.data.pages[0].data).toHaveLength(1);

    const meeting2 = { id: 2, region: '서울특별시 강남구' };
    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting2], hasMore: false, nextCursor: '' }, Date.now() + 100),
    ]);

    rerender({ region: ['서울특별시 강남구'] });
    await act(async () => {});

    const ids = result.current.data.pages[0].data.map((m) => (m as { id: number }).id);
    expect(ids).not.toContain(1);
    expect(ids).toContain(2);
  });

  it('한 지역만 hasMore: true이면 hasNextPage가 true를 반환해야 한다', async () => {
    const meeting1 = { id: 1, region: '부산광역시 북구' };
    const meeting2 = { id: 2, region: '서울특별시 강남구' };

    (useQueries as jest.Mock).mockReturnValue([
      makeQueryResult({ data: [meeting1], hasMore: true, nextCursor: 'cursor-a' }),
      makeQueryResult({ data: [meeting2], hasMore: false, nextCursor: '' }, Date.now() + 1),
    ]);

    const { result } = renderHook(() =>
      useSearchInfiniteOptions({ region: ['부산광역시 북구', '서울특별시 강남구'] })
    );

    await act(async () => {});

    expect(result.current.hasNextPage).toBe(true);
  });
});
