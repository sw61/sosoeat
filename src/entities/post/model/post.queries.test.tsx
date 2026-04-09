import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';

import {
  createSosoTalkPostLike,
  deleteSosoTalkPostLike,
  getSosoTalkPostDetail,
  getSosoTalkPostList,
} from '../api/posts.api';

import {
  sosotalkPostDetailQueryOptions,
  sosotalkPostListQueryOptions,
  sosotalkQueryKeys,
  useCreateSosoTalkPostLike,
  useDeleteSosoTalkPostLike,
} from './post.queries';
import type { GetSosoTalkPostDetailResponse, GetSosoTalkPostListResponse } from './post.types';

jest.mock('../api/posts.api', () => ({
  createSosoTalkPostLike: jest.fn(),
  deleteSosoTalkPostLike: jest.fn(),
  getSosoTalkPostDetail: jest.fn(),
  getSosoTalkPostList: jest.fn(),
}));

const mockCreateSosoTalkPostLike = createSosoTalkPostLike as jest.Mock;
const mockDeleteSosoTalkPostLike = deleteSosoTalkPostLike as jest.Mock;
const mockGetSosoTalkPostDetail = getSosoTalkPostDetail as jest.Mock;
const mockGetSosoTalkPostList = getSosoTalkPostList as jest.Mock;

const POST_ID = 1;
const LIST_PARAMS = {
  type: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  size: 10,
} as const;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  });

  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children),
  };
};

const createPostDetail = (): GetSosoTalkPostDetailResponse => ({
  id: POST_ID,
  teamId: 'dallaem',
  title: '소소톡 게시글',
  content: '<p>본문입니다.</p>',
  image: 'https://example.com/post.jpg',
  authorId: 10,
  viewCount: 10,
  likeCount: 4,
  createdAt: new Date('2026-03-18T09:00:00.000Z'),
  updatedAt: new Date('2026-03-18T09:00:00.000Z'),
  author: {
    id: 10,
    name: '작성자',
    image: 'https://example.com/author.jpg',
    email: 'writer@example.com',
  },
  count: {
    comments: 2,
  },
  comments: [],
  isLiked: false,
});

const createPostList = (): GetSosoTalkPostListResponse => ({
  data: [
    {
      id: POST_ID,
      teamId: 'dallaem',
      title: '소소톡 게시글',
      content: '<p>본문입니다.</p>',
      image: 'https://example.com/post.jpg',
      authorId: 10,
      viewCount: 10,
      likeCount: 4,
      createdAt: new Date('2026-03-18T09:00:00.000Z'),
      updatedAt: new Date('2026-03-18T09:00:00.000Z'),
      author: {
        id: 10,
        name: '작성자',
        image: 'https://example.com/author.jpg',
      },
      count: {
        comments: 2,
      },
    },
  ],
  hasMore: false,
});

const createDeferred = <T,>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

describe('sosotalk query options', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('목록/상세 쿼리 옵션에 동일한 캐시 정책을 적용한다', () => {
    const listOptions = sosotalkPostListQueryOptions(LIST_PARAMS);
    const detailOptions = sosotalkPostDetailQueryOptions(POST_ID);

    expect(listOptions.staleTime).toBe(30_000);
    expect(listOptions.gcTime).toBe(600_000);
    expect(detailOptions.staleTime).toBe(30_000);
    expect(detailOptions.gcTime).toBe(600_000);
  });
});

describe('sosotalk like mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSosoTalkPostDetail.mockResolvedValue(createPostDetail());
    mockGetSosoTalkPostList.mockResolvedValue(createPostList());
  });

  it('좋아요 추가 시 상세/목록 캐시를 낙관적으로 함께 갱신한다', async () => {
    const deferred = createDeferred<unknown>();
    mockCreateSosoTalkPostLike.mockReturnValue(deferred.promise);

    const { queryClient, wrapper } = createWrapper();
    queryClient.setQueryData(sosotalkQueryKeys.postDetail(POST_ID), createPostDetail());
    queryClient.setQueryData(sosotalkQueryKeys.postList(LIST_PARAMS), createPostList());

    const { result } = renderHook(() => useCreateSosoTalkPostLike(), { wrapper });

    let mutationPromise!: Promise<unknown>;
    act(() => {
      mutationPromise = result.current.mutateAsync(POST_ID);
    });

    await waitFor(() =>
      expect(
        queryClient.getQueryData<GetSosoTalkPostDetailResponse>(
          sosotalkQueryKeys.postDetail(POST_ID)
        )
      ).toMatchObject({
        isLiked: true,
        likeCount: 5,
      })
    );
    expect(
      queryClient.getQueryData<GetSosoTalkPostListResponse>(sosotalkQueryKeys.postList(LIST_PARAMS))
    ).toMatchObject({
      data: [expect.objectContaining({ id: POST_ID, likeCount: 5 })],
    });

    deferred.resolve({});
    await mutationPromise;

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('좋아요 취소 실패 시 상세/목록 캐시를 이전 상태로 롤백한다', async () => {
    mockDeleteSosoTalkPostLike.mockRejectedValue(new Error('좋아요 취소 실패'));

    const { queryClient, wrapper } = createWrapper();
    const likedDetail = {
      ...createPostDetail(),
      likeCount: 5,
      isLiked: true,
    };
    const likedList = {
      ...createPostList(),
      data: createPostList().data.map((post) => ({
        ...post,
        likeCount: 5,
      })),
    };

    queryClient.setQueryData(sosotalkQueryKeys.postDetail(POST_ID), likedDetail);
    queryClient.setQueryData(sosotalkQueryKeys.postList(LIST_PARAMS), likedList);

    const { result } = renderHook(() => useDeleteSosoTalkPostLike(), { wrapper });

    await expect(result.current.mutateAsync(POST_ID)).rejects.toThrow('좋아요 취소 실패');

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(
      queryClient.getQueryData<GetSosoTalkPostDetailResponse>(sosotalkQueryKeys.postDetail(POST_ID))
    ).toMatchObject({
      isLiked: true,
      likeCount: 5,
    });
    expect(
      queryClient.getQueryData<GetSosoTalkPostListResponse>(sosotalkQueryKeys.postList(LIST_PARAMS))
    ).toMatchObject({
      data: [expect.objectContaining({ id: POST_ID, likeCount: 5 })],
    });
  });
});
