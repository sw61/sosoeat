import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAuthStore } from '@/entities/auth';
import type { Meeting } from '@/entities/meeting';

import { MeetingHeroSection } from './meeting-hero-section';

const mockJoinMutate = jest.fn();
const mockLeaveMutate = jest.fn();
const mockConfirmMutate = jest.fn();
const mockDeleteMutate = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

jest.mock('@/features/meeting-edit', () => ({
  MeetingEditModal: () => null,
  toMeetingEditFormData: jest.fn(),
}));

jest.mock('../../model/meeting-detail.queries', () => ({
  useMeetingDetail: jest.fn(),
  useJoinMeeting: jest.fn(() => ({
    mutate: mockJoinMutate,
    isPending: false,
  })),
  useLeaveMeeting: jest.fn(() => ({
    mutate: mockLeaveMutate,
    isPending: false,
  })),
  useConfirmMeeting: jest.fn(() => ({
    mutate: mockConfirmMutate,
    isPending: false,
  })),
  useDeleteMeeting: jest.fn(() => ({
    mutate: mockDeleteMutate,
    isPending: false,
  })),
}));

jest.mock('./hooks/use-meeting-role', () => ({
  useMeetingRole: jest.fn(() => ({
    role: 'guest',
    status: 'open',
    isJoined: false,
  })),
}));

jest.mock('../meeting-detail-card', () => ({
  MeetingDetailCard: ({
    role,
    onJoin,
  }: {
    role: 'guest' | 'participant' | 'host';
    onJoin?: () => void;
  }) => (
    <button type="button" onClick={onJoin}>
      {role === 'guest' ? '참여하기' : '액션'}
    </button>
  ),
}));

const MOCK_MEETING: Meeting = {
  id: 1,
  name: '합정 점심 모임',
  type: 'groupEat',
  region: '마포구',
  address: '서울 마포구 양화로 10',
  latitude: 37.0,
  longitude: 127.0,
  dateTime: '2026-04-12T12:00:00.000Z',
  registrationEnd: '2026-04-11T12:00:00.000Z',
  capacity: 4,
  participantCount: 1,
  image: 'https://example.com/meeting.jpg',
  description: '같이 점심 드실 분 구해요.',
  confirmedAt: null,
  canceledAt: null,
  hostId: 7,
  teamId: 'team9',
  createdBy: 7,
  updatedAt: '2026-04-10T09:00:00.000Z',
  host: {
    id: 7,
    name: '호스트',
    image: 'https://example.com/host.jpg',
  },
  isFavorited: false,
  isJoined: false,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('MeetingHeroSection', () => {
  beforeEach(() => {
    mockJoinMutate.mockClear();
    mockLeaveMutate.mockClear();
    mockConfirmMutate.mockClear();
    mockDeleteMutate.mockClear();
    mockRefresh.mockClear();

    const { useMeetingDetail } = jest.requireMock('../../model/meeting-detail.queries');
    (useMeetingDetail as jest.Mock).mockReturnValue({ data: MOCK_MEETING });
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      isInitialized: true,
      isLoginRequired: false,
      isSessionExpired: false,
    });
  });

  it('비로그인 상태에서 참여하기를 누르면 로그인 필요 모달 상태만 연다', async () => {
    const user = userEvent.setup();

    render(<MeetingHeroSection meetingId={MOCK_MEETING.id} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole('button', { name: '참여하기' }));

    expect(mockJoinMutate).not.toHaveBeenCalled();
    expect(useAuthStore.getState().isLoginRequired).toBe(true);
  });

  it('로그인 상태에서 참여하기를 누르면 참여 mutation을 호출한다', async () => {
    const user = userEvent.setup();
    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: 20,
        name: '테스터',
        email: 'tester@example.com',
      },
      isInitialized: true,
      isLoginRequired: false,
      isSessionExpired: false,
    });

    render(<MeetingHeroSection meetingId={MOCK_MEETING.id} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole('button', { name: '참여하기' }));

    expect(mockJoinMutate).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().isLoginRequired).toBe(false);
  });
});
