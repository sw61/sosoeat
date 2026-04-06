import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';

import { useAuthStore } from '@/entities/auth/model/auth-store';
import { Host, MeetingWithHost } from '@/shared/types/generated-client';
import { MeetingList } from '@/shared/types/generated-client/models/MeetingList';

import { useSearchPage } from '../..';

import SearchPage from './search-page';

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

export const mockHost: Host = {
  id: 1,
  name: '김소소',
  image: 'https://example.com/images/host-1.jpg',
};

const createMockMeeting = (overrides: Partial<MeetingWithHost> = {}): MeetingWithHost => ({
  id: 1,
  teamId: 'team-abc',
  name: '강남 점심 같이 먹어요',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울특별시 강남구 테헤란로 123',
  latitude: 37.498095,
  longitude: 127.02761,
  dateTime: new Date('2026-04-15T12:00:00'),
  registrationEnd: new Date('2026-04-14T23:59:59'),
  capacity: 6,
  participantCount: 3,
  image: 'https://example.com/images/meeting-1.jpg',
  description: '강남역 근처 맛집에서 함께 점심 드실 분 모집합니다.',
  canceledAt: new Date('1970-01-01T00:00:00'),
  confirmedAt: new Date('2026-04-10T10:00:00'),
  hostId: 1,
  createdBy: 1,
  createdAt: new Date('2026-04-06T09:00:00'),
  updatedAt: new Date('2026-04-06T09:00:00'),
  host: mockHost,
  isFavorited: false,
  isJoined: false,
  isCompleted: false,
  ...overrides,
});

export const mockMeeting = createMockMeeting();

export const mockMeetingList: MeetingList = {
  data: [
    createMockMeeting({ id: 1, name: '강남 점심 같이 먹어요', type: 'groupEat' }),
    createMockMeeting({
      id: 2,
      name: '홍대 공동구매 모집',
      type: 'groupBuy',
      region: '서울 마포구',
      address: '서울특별시 마포구 홍익로 456',
      participantCount: 5,
      capacity: 10,
      isFavorited: true,
    }),
    createMockMeeting({
      id: 3,
      name: '판교 저녁 모임',
      type: 'groupEat',
      region: '경기 성남시',
      address: '경기도 성남시 분당구 판교역로 789',
      dateTime: new Date('2026-04-20T18:00:00'),
      registrationEnd: new Date('2026-04-19T23:59:59'),
      participantCount: 2,
      isCompleted: false,
    }),
  ],
  nextCursor: 'cursor-abc123',
  hasMore: false,
};

export const mockEmptyMeetingList: MeetingList = {
  data: [],
  nextCursor: '',
  hasMore: false,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('SearchPage', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockMeetingList,
      isLoading: false,
      isError: false,
    });

    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      isLoginRequired: false,
    });
  });

  it('isLoading일때 SearchSkeleton을 렌더링해야 한다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockMeetingList,
      isLoading: true,
      isError: false,
    });
    // Test implementation will go here
    const { result } = renderHook(() => useSearchPage());
    expect(result.current.isLoading).toBe(true);
  });

  it('isError일때 에러 메시지를 렌더링해야 한다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockMeetingList,
      isLoading: false,
      isError: true,
    });
    // Test implementation will go here
    const { result } = renderHook(() => useSearchPage());
    expect(result.current.isError).toBe(true);
  });

  it('meetingData=[] 일때 Empty Page가 보여야한다.', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockEmptyMeetingList,
      isLoading: false,
      isError: false,
    });
    renderWithClient(<SearchPage />);
    // Test implementation will go here
    expect(screen.getAllByAltText('Empty Page')).toHaveLength(2);
  });

  it('meetingData가 있을 때, 검색 결과를 렌더링해야 한다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockMeetingList,
      isLoading: false,
      isError: false,
    });
    // Test implementation will go here
    const { result } = renderHook(() => useSearchPage());
    expect(result.current.meetingData).toEqual(mockMeetingList.data);
  });

  it('비로그인 + 모임만들기 버튼 클릭 시 로그인 모달이 열려야 한다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockEmptyMeetingList,
      isLoading: false,
      isError: false,
    });

    renderWithClient(<SearchPage />);

    const createMeetingButton = screen.getByRole('button', { name: /모임 만들기/i });
    fireEvent.click(createMeetingButton);

    expect(useAuthStore.getState().isLoginRequired).toBe(true);
  });

  it('로그인 + 모임만들기 버튼 클릭 시 모임 생성 모달이 열려야한다.', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockEmptyMeetingList,
      isLoading: false,
      isError: false,
    });

    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: 1,
        name: '테스트유저',
        email: 'test@example.com',
        teamId: 'dallaem',
      },
    });

    renderWithClient(<SearchPage />);

    const createMeetingButton = screen.getByRole('button', { name: /모임 만들기/i });
    fireEvent.click(createMeetingButton);

    const makeModal = screen.getByRole('dialog', { name: /모임 생성/i });
    expect(makeModal).toBeInTheDocument();
  });
});
