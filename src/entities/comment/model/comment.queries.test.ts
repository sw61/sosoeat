import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { commentApi } from '../api/comment.api';

import { commentKeys, useCreateComment, useDeleteComment } from './comment.queries';

jest.mock('../api/comment.api', () => ({
  commentApi: {
    createComment: jest.fn(),
    deleteComment: jest.fn(),
  },
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockCreateComment = commentApi.createComment as jest.Mock;
const mockDeleteComment = commentApi.deleteComment as jest.Mock;

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
      queryKey: commentKeys.list(MEETING_ID),
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
    expect(toast.error).toHaveBeenCalledWith('댓글 작성 실패');
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
      queryKey: commentKeys.list(MEETING_ID),
    });
  });

  it('실패 시 error toast를 띄운다', async () => {
    mockDeleteComment.mockRejectedValue(new Error('댓글 삭제 실패'));

    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useDeleteComment(MEETING_ID), { wrapper });

    result.current.mutate(10);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalledWith('댓글 삭제 실패');
  });
});
