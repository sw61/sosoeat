import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { meetingCommentApi, meetingCommentKeys } from '@/entities/meeting-comment';

import { useCreateComment, useDeleteComment } from './meeting-comment.mutations';

jest.mock('@/entities/meeting-comment', () => ({
  meetingCommentApi: {
    createComment: jest.fn(),
    deleteComment: jest.fn(),
  },
  meetingCommentKeys: {
    list: (meetingId: number) => ['meeting-comments', meetingId],
    count: (meetingId: number) => ['meeting-comments', meetingId, 'count'],
  },
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockCreateComment = meetingCommentApi.createComment as jest.Mock;
const mockDeleteComment = meetingCommentApi.deleteComment as jest.Mock;

const MEETING_ID = 1;

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children),
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useCreateComment', () => {
  it('성공 시 댓글 목록 쿼리를 invalidate 한다', async () => {
    mockCreateComment.mockResolvedValue({ id: 1, content: '새 댓글' });
    const { queryClient, wrapper } = createWrapper();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useCreateComment(MEETING_ID, { nickname: '테스트', profileUrl: null }),
      { wrapper }
    );

    result.current.mutate({ content: '새 댓글' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: meetingCommentKeys.list(MEETING_ID),
    });
  });

  it('실패 시 error toast를 띄운다', async () => {
    mockCreateComment.mockRejectedValue(new Error('댓글 작성 실패'));

    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useCreateComment(MEETING_ID, { nickname: '테스트', profileUrl: null }),
      { wrapper }
    );

    result.current.mutate({ content: '새 댓글' });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalledWith('댓글 작성 중 문제가 생겼어요. 다시 시도해 주세요.');
  });
});

describe('useDeleteComment', () => {
  it('성공 시 댓글 목록 쿼리를 invalidate 한다', async () => {
    mockDeleteComment.mockResolvedValue(undefined);
    const { queryClient, wrapper } = createWrapper();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useDeleteComment(MEETING_ID), { wrapper });

    result.current.mutate(10);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: meetingCommentKeys.list(MEETING_ID),
    });
  });

  it('실패 시 error toast를 띄운다', async () => {
    mockDeleteComment.mockRejectedValue(new Error('댓글 삭제 실패'));

    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useDeleteComment(MEETING_ID), { wrapper });

    result.current.mutate(10);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalledWith('댓글 삭제 중 문제가 생겼어요. 다시 시도해 주세요.');
  });
});
