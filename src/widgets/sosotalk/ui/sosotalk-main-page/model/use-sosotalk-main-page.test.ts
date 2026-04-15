import { renderHook } from '@testing-library/react';

import type { GetSosoTalkPostListResponse } from '@/entities/post';
import { mapPostToSosoTalkCardItem, useGetSosoTalkPostInfiniteList } from '@/entities/post';

import { useSosoTalkMainPage } from './use-sosotalk-main-page';

jest.mock('nuqs', () => ({
  parseAsStringLiteral: () => ({
    withDefault: () => ({
      withOptions: () => ({}),
    }),
  }),
  useQueryState: jest.fn(),
}));

jest.mock('@/entities/post', () => ({
  mapPostToSosoTalkCardItem: jest.fn(),
  useGetSosoTalkPostInfiniteList: jest.fn(),
}));

const mockUseQueryState = jest.requireMock('nuqs').useQueryState as jest.Mock;
const mockUseGetSosoTalkPostInfiniteList = useGetSosoTalkPostInfiniteList as jest.Mock;
const mockMapPostToSosoTalkCardItem = mapPostToSosoTalkCardItem as jest.Mock;

const initialData: GetSosoTalkPostListResponse = {
  data: [
    {
      id: 1,
      teamId: 'dallaem',
      title: '게시글',
      content: '<p>본문</p>',
      image: '',
      authorId: 2,
      viewCount: 0,
      likeCount: 0,
      createdAt: new Date('2026-04-14T00:00:00.000Z'),
      updatedAt: new Date('2026-04-14T00:00:00.000Z'),
      author: {
        id: 2,
        name: '테스터',
        image: '',
      },
      count: {
        comments: 0,
      },
    },
  ],
  hasMore: false,
};

describe('useSosoTalkMainPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGetSosoTalkPostInfiniteList.mockReturnValue({
      data: { pages: [initialData] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
    });
    mockMapPostToSosoTalkCardItem.mockImplementation((post) => post);
  });

  it('현재 탭과 정렬이 초기 상태와 같으면 initialData를 쿼리 초기값으로 전달한다', () => {
    mockUseQueryState
      .mockReturnValueOnce(['all', jest.fn()])
      .mockReturnValueOnce(['latest', jest.fn()]);

    renderHook(() =>
      useSosoTalkMainPage({
        initialData,
        initialTab: 'all',
        initialSort: 'latest',
      })
    );

    expect(mockUseGetSosoTalkPostInfiniteList).toHaveBeenCalledWith(
      {
        type: 'all',
        sortBy: 'createdAt',
        sortOrder: 'desc',
        size: 10,
      },
      initialData
    );
  });

  it('현재 탭과 정렬이 초기 상태와 다르면 initialData를 재사용하지 않는다', () => {
    mockUseQueryState
      .mockReturnValueOnce(['popular', jest.fn()])
      .mockReturnValueOnce(['likes', jest.fn()]);

    renderHook(() =>
      useSosoTalkMainPage({
        initialData,
        initialTab: 'all',
        initialSort: 'latest',
      })
    );

    expect(mockUseGetSosoTalkPostInfiniteList).toHaveBeenCalledWith(
      {
        type: 'best',
        sortBy: 'likeCount',
        sortOrder: 'desc',
        size: 10,
      },
      undefined
    );
  });
});
