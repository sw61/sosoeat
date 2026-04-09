import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { meetingCommentApi } from '../api/meeting-comment.api';

import { useComments } from './meeting-comment.queries';
import { meetingCommentKeys } from './meeting-comment-keys';

jest.mock('../api/meeting-comment.api', () => ({
  meetingCommentApi: {
    getComments: jest.fn(),
  },
}));

const mockGetComments = meetingCommentApi.getComments as jest.Mock;

const MEETING_ID = 1;

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children),
  };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useComments', () => {
  it('성공 시 댓글 목록을 반환한다', async () => {
    const mockData = [{ id: 1, content: '댓글' }];
    mockGetComments.mockResolvedValue(mockData);
    const { wrapper } = createWrapper();

    const { result } = renderHook(() => useComments(MEETING_ID), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
    expect(mockGetComments).toHaveBeenCalledWith(MEETING_ID, undefined);
  });

  it('queryKey가 meetingCommentKeys.list를 사용한다', async () => {
    mockGetComments.mockResolvedValue([]);
    const { queryClient, wrapper } = createWrapper();

    renderHook(() => useComments(MEETING_ID), { wrapper });

    await waitFor(() =>
      expect(queryClient.getQueryState(meetingCommentKeys.list(MEETING_ID))).toBeDefined()
    );
  });
});
