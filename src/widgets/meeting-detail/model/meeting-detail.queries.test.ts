import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { meetingsApi, mypageMeetingCountKey } from '@/entities/meeting';

import { useDeleteMeeting, useJoinMeeting, useLeaveMeeting } from './meeting-detail.queries';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

jest.mock('@/entities/meeting', () => ({
  meetingsApi: {
    join: jest.fn(),
    leave: jest.fn(),
    deleteMeeting: jest.fn(),
  },
  mypageMeetingCountKey: ['users', 'me', 'meeting-count'],
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockJoin = meetingsApi.join as jest.Mock;
const mockLeave = meetingsApi.leave as jest.Mock;
const mockDelete = meetingsApi.deleteMeeting as jest.Mock;

const MEETING_ID = 1;

const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useJoinMeeting', () => {
  beforeEach(() => jest.clearAllMocks());

  it('성공 시 mypageMeetingCountKey를 invalidate한다', async () => {
    mockJoin.mockResolvedValue(undefined);
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useJoinMeeting(MEETING_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: mypageMeetingCountKey });
    expect(toast.success).toHaveBeenCalled();
  });

  it('실패 시 mypageMeetingCountKey를 invalidate하지 않는다', async () => {
    mockJoin.mockRejectedValue(new Error('모임 참여에 실패했습니다.'));
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useJoinMeeting(MEETING_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(invalidateSpy).not.toHaveBeenCalledWith({ queryKey: mypageMeetingCountKey });
    expect(toast.error).toHaveBeenCalled();
  });
});

describe('useLeaveMeeting', () => {
  beforeEach(() => jest.clearAllMocks());

  it('성공 시 mypageMeetingCountKey를 invalidate한다', async () => {
    mockLeave.mockResolvedValue(undefined);
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useLeaveMeeting(MEETING_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: mypageMeetingCountKey });
    expect(toast.success).toHaveBeenCalled();
  });

  it('실패 시 mypageMeetingCountKey를 invalidate하지 않는다', async () => {
    mockLeave.mockRejectedValue(new Error('모임 참여 취소에 실패했습니다.'));
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useLeaveMeeting(MEETING_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(invalidateSpy).not.toHaveBeenCalledWith({ queryKey: mypageMeetingCountKey });
    expect(toast.error).toHaveBeenCalled();
  });
});

describe('useDeleteMeeting', () => {
  beforeEach(() => jest.clearAllMocks());

  it('성공 시 mypageMeetingCountKey를 invalidate한다', async () => {
    mockDelete.mockResolvedValue(undefined);
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useDeleteMeeting(MEETING_ID), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: mypageMeetingCountKey });
    expect(toast.success).toHaveBeenCalled();
  });
});
