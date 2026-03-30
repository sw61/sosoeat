import { fetchClient } from '@/lib/http/fetch-client';

import { getSosoTalkPostDetail, getSosoTalkPostList } from './sosotalk.api';

jest.mock('@/lib/http/fetch-client', () => ({
  fetchClient: {
    get: jest.fn(),
  },
}));

const createSuccessResponse = (jsonValue: unknown) =>
  ({
    ok: true,
    json: jest.fn().mockResolvedValue(jsonValue),
  }) as unknown as Response;

describe('getSosoTalkPostList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본 최신순 전체 TALK 목록 요청을 보낸다', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        data: [],
        nextCursor: '',
        hasMore: false,
      })
    );

    await getSosoTalkPostList();

    expect(fetchClient.get).toHaveBeenCalledWith(
      '/posts?type=all&sortBy=createdAt&sortOrder=desc&size=10'
    );
  });

  it('전달한 파라미터로 목록 요청을 보낸다', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        data: [],
        nextCursor: 'next-cursor',
        hasMore: true,
      })
    );

    await getSosoTalkPostList({
      type: 'best',
      sortBy: 'likeCount',
      sortOrder: 'asc',
      cursor: 'cursor-1',
      size: 5,
    });

    expect(fetchClient.get).toHaveBeenCalledWith(
      '/posts?type=best&sortBy=likeCount&sortOrder=asc&size=5&cursor=cursor-1'
    );
  });

  it('응답을 PostList 형태로 변환한다', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        data: [
          {
            id: 1,
            teamId: 'dallaem',
            title: '소소톡 제목',
            content: '소소톡 내용',
            image: 'https://example.com/post-image.jpg',
            authorId: 10,
            viewCount: 20,
            likeCount: 3,
            createdAt: '2026-03-30T00:00:00.000Z',
            updatedAt: '2026-03-30T00:00:00.000Z',
            author: {
              id: 10,
              name: '소소',
              image: 'https://example.com/author-image.jpg',
            },
            _count: {
              comments: 7,
            },
          },
        ],
        nextCursor: 'cursor-2',
        hasMore: true,
      })
    );

    const result = await getSosoTalkPostList();

    expect(result.hasMore).toBe(true);
    expect(result.nextCursor).toBe('cursor-2');
    expect(result.data[0].createdAt).toBeInstanceOf(Date);
    expect(result.data[0].count.comments).toBe(7);
    expect(result.data[0].author.name).toBe('소소');
  });

  it('요청 실패 시 에러를 던진다', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue({
      ok: false,
      json: jest.fn(),
    } as unknown as Response);

    await expect(getSosoTalkPostList()).rejects.toThrow(
      '소소톡 게시글 목록을 불러오지 못했습니다.'
    );
  });
});

describe('getSosoTalkPostDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('전달한 postId로 상세 조회 요청을 보낸다', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        id: 1,
        teamId: 'dallaem',
        title: '소소톡 제목',
        content: '<p>소소톡 내용</p>',
        image: 'https://example.com/post-image.jpg',
        authorId: 10,
        viewCount: 20,
        likeCount: 3,
        createdAt: '2026-03-30T00:00:00.000Z',
        updatedAt: '2026-03-30T00:00:00.000Z',
        author: {
          id: 10,
          name: '소소',
          image: 'https://example.com/author-image.jpg',
        },
        _count: {
          comments: 2,
        },
        comments: [],
        isLiked: false,
      })
    );

    await getSosoTalkPostDetail(1);

    expect(fetchClient.get).toHaveBeenCalledWith('/posts/1');
  });

  it('응답을 PostWithComments 형태로 변환한다', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        id: 1,
        teamId: 'dallaem',
        title: '소소톡 제목',
        content: '<p>소소톡 내용</p>',
        image: 'https://example.com/post-image.jpg',
        authorId: 10,
        viewCount: 20,
        likeCount: 3,
        createdAt: '2026-03-30T00:00:00.000Z',
        updatedAt: '2026-03-30T00:00:00.000Z',
        author: {
          id: 10,
          name: '소소',
          image: 'https://example.com/author-image.jpg',
        },
        _count: {
          comments: 2,
        },
        comments: [
          {
            id: 5,
            teamId: 'dallaem',
            postId: 1,
            authorId: 11,
            author: {
              id: 11,
              name: '달래',
              image: 'https://example.com/comment-author-image.jpg',
            },
            content: '댓글입니다.',
            createdAt: '2026-03-30T01:00:00.000Z',
            updatedAt: '2026-03-30T01:00:00.000Z',
          },
        ],
        isLiked: true,
      })
    );

    const result = await getSosoTalkPostDetail(1);

    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.comments[0].createdAt).toBeInstanceOf(Date);
    expect(result.count.comments).toBe(2);
    expect(result.isLiked).toBe(true);
  });

  it('요청 실패 시 에러를 던진다', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue({
      ok: false,
      json: jest.fn(),
    } as unknown as Response);

    await expect(getSosoTalkPostDetail(1)).rejects.toThrow(
      '소소톡 게시글을 불러오지 못했습니다.'
    );
  });
});
