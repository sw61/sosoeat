import { commentClient } from '@/lib/http/comment-client';

import { commentApi } from './comment.api';

jest.mock('@/lib/http/comment-client', () => ({
  commentClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockClient = commentClient as unknown as {
  get: jest.Mock;
  post: jest.Mock;
  patch: jest.Mock;
  delete: jest.Mock;
};

const okResponse = (data: unknown) => ({
  ok: true,
  json: jest.fn().mockResolvedValue(data),
});

const errorResponse = (message?: string) => ({
  ok: false,
  json: jest.fn().mockResolvedValue(message ? { message } : {}),
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('commentApi.getComments', () => {
  it('올바른 URL로 GET 요청을 보낸다', async () => {
    mockClient.get.mockResolvedValue(okResponse([]));
    await commentApi.getComments(1);
    expect(mockClient.get).toHaveBeenCalledWith('/meetings/1/comments');
  });

  it('응답 실패 시 서버 메시지로 에러를 throw 한다', async () => {
    mockClient.get.mockResolvedValue(errorResponse('서버 오류'));
    await expect(commentApi.getComments(1)).rejects.toThrow('서버 오류');
  });

  it('응답 실패 시 메시지 없으면 기본 에러를 throw 한다', async () => {
    mockClient.get.mockResolvedValue(errorResponse());
    await expect(commentApi.getComments(1)).rejects.toThrow('댓글을 불러오는데 실패했습니다.');
  });
});

describe('commentApi.getCommentCount', () => {
  it('올바른 URL로 GET 요청을 보낸다', async () => {
    mockClient.get.mockResolvedValue(okResponse({ count: 5 }));
    await commentApi.getCommentCount(1);
    expect(mockClient.get).toHaveBeenCalledWith('/meetings/1/comments/count');
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.get.mockResolvedValue(errorResponse('조회 실패'));
    await expect(commentApi.getCommentCount(1)).rejects.toThrow('조회 실패');
  });
});

describe('commentApi.createComment', () => {
  const payload = { content: '안녕하세요' };

  it('올바른 URL과 payload로 POST 요청을 보낸다', async () => {
    mockClient.post.mockResolvedValue(okResponse({ id: 1, content: '안녕하세요' }));
    await commentApi.createComment(1, payload);
    expect(mockClient.post).toHaveBeenCalledWith('/meetings/1/comments', payload);
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.post.mockResolvedValue(errorResponse('댓글 작성 실패'));
    await expect(commentApi.createComment(1, payload)).rejects.toThrow('댓글 작성 실패');
  });
});

describe('commentApi.updateComment', () => {
  const payload = { content: '수정된 내용' };

  it('올바른 URL과 payload로 PATCH 요청을 보낸다', async () => {
    mockClient.patch.mockResolvedValue(okResponse({ id: 10, content: '수정된 내용' }));
    await commentApi.updateComment(10, payload);
    expect(mockClient.patch).toHaveBeenCalledWith('/comments/10', payload);
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.patch.mockResolvedValue(errorResponse('댓글 수정 실패'));
    await expect(commentApi.updateComment(10, payload)).rejects.toThrow('댓글 수정 실패');
  });
});

describe('commentApi.deleteComment', () => {
  it('올바른 URL로 DELETE 요청을 보낸다', async () => {
    mockClient.delete.mockResolvedValue(okResponse(null));
    await commentApi.deleteComment(10);
    expect(mockClient.delete).toHaveBeenCalledWith('/comments/10');
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.delete.mockResolvedValue(errorResponse('댓글 삭제 실패'));
    await expect(commentApi.deleteComment(10)).rejects.toThrow('댓글 삭제 실패');
  });
});

describe('commentApi.likeComment', () => {
  it('올바른 URL로 POST 요청을 보낸다', async () => {
    mockClient.post.mockResolvedValue(okResponse(null));
    await commentApi.likeComment(10);
    expect(mockClient.post).toHaveBeenCalledWith('/comments/10/likes');
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.post.mockResolvedValue(errorResponse('좋아요 실패'));
    await expect(commentApi.likeComment(10)).rejects.toThrow('좋아요 실패');
  });
});

describe('commentApi.unlikeComment', () => {
  it('올바른 URL로 DELETE 요청을 보낸다', async () => {
    mockClient.delete.mockResolvedValue(okResponse(null));
    await commentApi.unlikeComment(10);
    expect(mockClient.delete).toHaveBeenCalledWith('/comments/10/likes');
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.delete.mockResolvedValue(errorResponse('좋아요 취소 실패'));
    await expect(commentApi.unlikeComment(10)).rejects.toThrow('좋아요 취소 실패');
  });
});

describe('commentApi.syncCreateMeeting', () => {
  const payload = { id: 1, hostId: 42, teamId: 'team-abc' };

  it('올바른 URL과 payload로 POST 요청을 보낸다', async () => {
    mockClient.post.mockResolvedValue(okResponse(null));
    await commentApi.syncCreateMeeting(payload);
    expect(mockClient.post).toHaveBeenCalledWith('/meetings', payload);
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.post.mockResolvedValue(errorResponse('동기화 실패'));
    await expect(commentApi.syncCreateMeeting(payload)).rejects.toThrow('동기화 실패');
  });
});

describe('commentApi.syncDeleteMeeting', () => {
  it('올바른 URL로 DELETE 요청을 보낸다', async () => {
    mockClient.delete.mockResolvedValue(okResponse(null));
    await commentApi.syncDeleteMeeting(1);
    expect(mockClient.delete).toHaveBeenCalledWith('/meetings/1');
  });

  it('응답 실패 시 에러를 throw 한다', async () => {
    mockClient.delete.mockResolvedValue(errorResponse('삭제 동기화 실패'));
    await expect(commentApi.syncDeleteMeeting(1)).rejects.toThrow('삭제 동기화 실패');
  });
});
