import { fetchClient } from '@/lib/http/fetch-client';

import {
  createSosoTalkComment,
  createSosoTalkPost,
  createSosoTalkPostLike,
  deleteSosoTalkComment,
  deleteSosoTalkPost,
  deleteSosoTalkPostLike,
  getSosoTalkPostDetail,
  getSosoTalkPostList,
  requestSosoTalkPostImageUploadUrl,
  updateSosoTalkComment,
  updateSosoTalkPost,
  uploadSosoTalkPostImage,
} from './sosotalk.api';

jest.mock('@/lib/http/fetch-client', () => ({
  fetchClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
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

  it('requests the default post list query', async () => {
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

  it('requests the post list with custom params', async () => {
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

  it('converts the response to PostList', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        data: [
          {
            id: 1,
            teamId: 'dallaem',
            title: 'post title',
            content: 'post content',
            image: 'https://example.com/post-image.jpg',
            authorId: 10,
            viewCount: 20,
            likeCount: 3,
            createdAt: '2026-03-30T00:00:00.000Z',
            updatedAt: '2026-03-30T00:00:00.000Z',
            author: {
              id: 10,
              name: 'author',
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
    expect(result.data[0].author.name).toBe('author');
  });

  it('throws when the list request fails', async () => {
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

  it('requests the post detail by postId', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        id: 1,
        teamId: 'dallaem',
        title: 'post title',
        content: '<p>post content</p>',
        image: 'https://example.com/post-image.jpg',
        authorId: 10,
        viewCount: 20,
        likeCount: 3,
        createdAt: '2026-03-30T00:00:00.000Z',
        updatedAt: '2026-03-30T00:00:00.000Z',
        author: {
          id: 10,
          name: 'author',
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

  it('converts the response to PostWithComments', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue(
      createSuccessResponse({
        id: 1,
        teamId: 'dallaem',
        title: 'post title',
        content: '<p>post content</p>',
        image: 'https://example.com/post-image.jpg',
        authorId: 10,
        viewCount: 20,
        likeCount: 3,
        createdAt: '2026-03-30T00:00:00.000Z',
        updatedAt: '2026-03-30T00:00:00.000Z',
        author: {
          id: 10,
          name: 'author',
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
              name: 'commenter',
              image: 'https://example.com/comment-author-image.jpg',
            },
            content: 'comment body',
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

  it('throws when the detail request fails', async () => {
    jest.mocked(fetchClient.get).mockResolvedValue({
      ok: false,
      json: jest.fn(),
    } as unknown as Response);

    await expect(getSosoTalkPostDetail(1)).rejects.toThrow('소소톡 게시글을 불러오지 못했습니다.');
  });
});

describe('post actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates the post', async () => {
    jest.mocked(fetchClient.post).mockResolvedValue(
      createSuccessResponse({
        id: 8,
        teamId: 'dallaem',
        title: 'new title',
        content: '<p>new content</p>',
        image: 'https://example.com/post.jpg',
        authorId: 10,
        viewCount: 0,
        likeCount: 0,
        createdAt: '2026-03-31T00:00:00.000Z',
        updatedAt: '2026-03-31T00:00:00.000Z',
        author: {
          id: 10,
          name: 'author',
          image: 'https://example.com/author-image.jpg',
        },
        _count: {
          comments: 0,
        },
      })
    );

    const result = await createSosoTalkPost({
      payload: {
        title: 'new title',
        content: '<p>new content</p>',
      },
    });

    expect(fetchClient.post).toHaveBeenCalledWith('/posts', {
      title: 'new title',
      content: '<p>new content</p>',
    });
    expect(result.id).toBe(8);
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it('requests a presigned upload url for a post image', async () => {
    const file = new File(['image'], 'post-image.png', { type: 'image/png' });
    jest.mocked(fetchClient.post).mockResolvedValue(
      createSuccessResponse({
        presignedUrl: 'https://example.com/presigned',
        publicUrl: 'https://cdn.example.com/post-image.png',
      })
    );

    const result = await requestSosoTalkPostImageUploadUrl(file);

    expect(fetchClient.post).toHaveBeenCalledWith('/images', {
      fileName: 'post-image.png',
      contentType: 'image/png',
      folder: 'posts',
    });
    expect(result.publicUrl).toBe('https://cdn.example.com/post-image.png');
  });

  it('uploads the image file and returns the public url', async () => {
    const file = new File(['image'], 'post-image.png', { type: 'image/png' });
    jest.mocked(fetchClient.post).mockResolvedValue(
      createSuccessResponse({
        presignedUrl: 'https://example.com/presigned',
        publicUrl: 'https://cdn.example.com/post-image.png',
      })
    );
    jest.mocked(global.fetch).mockResolvedValue({
      ok: true,
    } as Response);

    const result = await uploadSosoTalkPostImage(file);

    expect(fetchClient.post).toHaveBeenCalledWith('/images', {
      fileName: 'post-image.png',
      contentType: 'image/png',
      folder: 'posts',
    });
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/presigned', {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png',
      },
      body: file,
    });
    expect(result).toBe('https://cdn.example.com/post-image.png');
  });

  it('creates a like for the post', async () => {
    jest.mocked(fetchClient.post).mockResolvedValue(
      createSuccessResponse({
        id: 1,
        teamId: 'dallaem',
        postId: 3,
        userId: 99,
        createdAt: '2026-03-31T00:00:00.000Z',
      })
    );

    const result = await createSosoTalkPostLike(3);

    expect(fetchClient.post).toHaveBeenCalledWith('/posts/3/like');
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it('deletes a like for the post', async () => {
    jest.mocked(fetchClient.delete).mockResolvedValue(
      createSuccessResponse({
        message: '좋아요가 취소되었습니다.',
      })
    );

    const result = await deleteSosoTalkPostLike(3);

    expect(fetchClient.delete).toHaveBeenCalledWith('/posts/3/like');
    expect(result.message).toBe('좋아요가 취소되었습니다.');
  });

  it('creates a comment for the post', async () => {
    jest.mocked(fetchClient.post).mockResolvedValue(
      createSuccessResponse({
        id: 10,
        teamId: 'dallaem',
        postId: 3,
        authorId: 7,
        author: {
          id: 7,
          name: 'commenter',
          image: 'https://example.com/commenter.jpg',
        },
        content: 'new comment',
        createdAt: '2026-03-31T01:00:00.000Z',
        updatedAt: '2026-03-31T01:00:00.000Z',
      })
    );

    const result = await createSosoTalkComment({
      postId: 3,
      payload: { content: 'new comment' },
    });

    expect(fetchClient.post).toHaveBeenCalledWith('/posts/3/comments', {
      content: 'new comment',
    });
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.content).toBe('new comment');
  });

  it('updates a comment for the post', async () => {
    jest.mocked(fetchClient.patch).mockResolvedValue(
      createSuccessResponse({
        id: 10,
        teamId: 'dallaem',
        postId: 3,
        authorId: 7,
        author: {
          id: 7,
          name: 'commenter',
          image: 'https://example.com/commenter.jpg',
        },
        content: 'updated comment',
        createdAt: '2026-03-31T01:00:00.000Z',
        updatedAt: '2026-03-31T02:00:00.000Z',
      })
    );

    const result = await updateSosoTalkComment({
      postId: 3,
      commentId: 10,
      payload: { content: 'updated comment' },
    });

    expect(fetchClient.patch).toHaveBeenCalledWith('/posts/3/comments/10', {
      content: 'updated comment',
    });
    expect(result.updatedAt).toBeInstanceOf(Date);
    expect(result.content).toBe('updated comment');
  });

  it('deletes a comment for the post', async () => {
    jest.mocked(fetchClient.delete).mockResolvedValue(
      createSuccessResponse({
        message: '댓글이 삭제되었습니다.',
      })
    );

    const result = await deleteSosoTalkComment({
      postId: 3,
      commentId: 10,
    });

    expect(fetchClient.delete).toHaveBeenCalledWith('/posts/3/comments/10');
    expect(result.message).toBe('댓글이 삭제되었습니다.');
  });

  it('updates the post', async () => {
    jest.mocked(fetchClient.patch).mockResolvedValue(
      createSuccessResponse({
        id: 3,
        teamId: 'dallaem',
        title: 'updated title',
        content: 'updated content',
        image: 'https://example.com/post.jpg',
        authorId: 10,
        viewCount: 20,
        likeCount: 3,
        createdAt: '2026-03-30T00:00:00.000Z',
        updatedAt: '2026-03-31T00:00:00.000Z',
        author: {
          id: 10,
          name: 'author',
          image: 'https://example.com/author-image.jpg',
        },
        _count: {
          comments: 4,
        },
      })
    );

    const result = await updateSosoTalkPost({
      postId: 3,
      payload: {
        title: 'updated title',
        content: 'updated content',
      },
    });

    expect(fetchClient.patch).toHaveBeenCalledWith('/posts/3', {
      title: 'updated title',
      content: 'updated content',
    });
    expect(result.updatedAt).toBeInstanceOf(Date);
    expect(result.title).toBe('updated title');
  });

  it('deletes the post', async () => {
    jest.mocked(fetchClient.delete).mockResolvedValue(
      createSuccessResponse({
        message: '게시글이 삭제되었습니다.',
      })
    );

    const result = await deleteSosoTalkPost({ postId: 3 });

    expect(fetchClient.delete).toHaveBeenCalledWith('/posts/3');
    expect(result.message).toBe('게시글이 삭제되었습니다.');
  });
});
