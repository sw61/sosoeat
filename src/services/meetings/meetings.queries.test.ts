import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

import { commentApi } from '@/services/comments';
import type { CreateMeeting } from '@/types/generated-client/models/CreateMeeting';

import { meetingsApi } from './meetings.api';
import { useCreateMeeting } from './meetings.queries';

jest.mock('./meetings.api', () => ({
  meetingsApi: {
    create: jest.fn(),
  },
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/services/comments', () => ({
  commentApi: {
    syncCreateMeeting: jest.fn(),
  },
}));

const mockCreate = meetingsApi.create as jest.Mock;
const mockSyncCreateMeeting = commentApi.syncCreateMeeting as jest.Mock;

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

/** 모달의 handleSubmit과 동일한 변환 로직 */
const MOCK_PAYLOAD: CreateMeeting = {
  name: '맛있는 삼겹살 모임',
  type: 'groupEat',
  region: '서울 강남구',
  address: '테헤란로 123',
  dateTime: new Date('2026-12-31T19:00'),
  registrationEnd: new Date('2026-12-30T18:00'),
  capacity: 10,
  image: 'https://s3.example.com/image.jpg',
  description: '같이 삼겹살 먹어요!',
};

describe('useCreateMeeting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('모임 생성 성공 시 isSuccess 상태가 되고 success toast를 띄운다', async () => {
    const mockMeeting = { id: 1, hostId: 42, teamId: 'team-abc' };
    mockCreate.mockResolvedValue(mockMeeting);
    mockSyncCreateMeeting.mockResolvedValue(undefined);

    const { result } = renderHook(() => useCreateMeeting(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(MOCK_PAYLOAD);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockSyncCreateMeeting).toHaveBeenCalledWith({
      id: mockMeeting.id,
      hostId: mockMeeting.hostId,
      teamId: mockMeeting.teamId,
    });
    expect(toast.success).toHaveBeenCalled();
  });

  it('모임 생성 실패 시 isError 상태가 되고 error toast를 띄운다', async () => {
    mockCreate.mockRejectedValue(new Error('모임 생성에 실패했습니다.'));

    const { result } = renderHook(() => useCreateMeeting(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(MOCK_PAYLOAD);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('모임 생성에 실패했습니다.'));
    expect(toast.error).toHaveBeenCalled();
  });
});
