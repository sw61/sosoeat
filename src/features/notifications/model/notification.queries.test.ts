import React from 'react';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

import { notificationApi } from '../api/notifications.api';

import { useUnreadCount } from './notification.queries';

jest.mock('../api/notifications.api', () => ({
  notificationApi: {
    getUnreadCount: jest.fn().mockResolvedValue(0),
  },
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useUnreadCount', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({ data: 0, isLoading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('refetchInterval이 30초로 설정된다', () => {
    renderHook(() => useUnreadCount(0, true), { wrapper: createWrapper() });

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        refetchInterval: 1000 * 30,
        staleTime: 1000 * 30,
      })
    );
  });

  it('enabled=false면 쿼리가 비활성화된다', () => {
    renderHook(() => useUnreadCount(0, false), { wrapper: createWrapper() });

    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({ enabled: false }));
  });

  it('getUnreadCount를 queryFn으로 사용한다', () => {
    renderHook(() => useUnreadCount(0, true), { wrapper: createWrapper() });

    const call = (useQuery as jest.Mock).mock.calls[0][0];
    expect(call.queryFn).toBe(notificationApi.getUnreadCount);
  });
});
