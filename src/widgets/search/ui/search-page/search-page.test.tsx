import { useInView } from 'react-intersection-observer';

import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing';

import { useAuthStore } from '@/entities/auth';
import type { Host, MeetingWithHost } from '@/shared/types/generated-client';
import type { MeetingList } from '@/shared/types/generated-client/models/MeetingList';

import { useSearchPage } from '../..';

import SearchPage from './search-page';

const NuqsWrapper = withNuqsTestingAdapter({ searchParams: {} });
const renderWithNuqs = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <NuqsWrapper>{children}</NuqsWrapper>
      </QueryClientProvider>
    ),
  });
};

const renderHookWithNuqs = <T,>(hook: () => T) =>
  renderHook(hook, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={new QueryClient()}>
        <NuqsWrapper>{children}</NuqsWrapper>
      </QueryClientProvider>
    ),
  });

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

const mockInfiniteData = (list: MeetingList) => ({
  pages: [list],
  pageParams: [undefined],
});

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));
jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

const defaultInfiniteReturn = {
  data: mockInfiniteData(mockMeetingList),
  isLoading: false,
  isError: false,
  hasNextPage: false,
  isFetching: false,
  fetchNextPage: jest.fn(),
};

describe('SearchPage', () => {
  beforeEach(() => {
    (useInfiniteQuery as jest.Mock).mockReturnValue(defaultInfiniteReturn);
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      isLoginRequired: false,
    });
  });

  it('isLoading일때 SearchSkeleton을 렌더링해야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: undefined,
      isLoading: true,
    });
    const { result } = renderHookWithNuqs(() => useSearchPage(null));
    expect(result.current.isLoading).toBe(true);
  });

  it('isError일때 에러 메시지를 렌더링해야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      isError: true,
    });
    const { result } = renderHookWithNuqs(() => useSearchPage(null));
    expect(result.current.isError).toBe(true);
  });

  it('meetingData=[] 일때 Empty Page가 보여야한다.', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: mockInfiniteData(mockEmptyMeetingList),
    });
    renderWithNuqs(<SearchPage initialData={null} />);
    expect(screen.getAllByAltText('Empty Page')).toHaveLength(2);
  });

  it('meetingData가 있을 때 검색 결과를 렌더링해야 한다', () => {
    const { result } = renderHookWithNuqs(() => useSearchPage(null));
    expect(result.current.meetingData).toEqual(mockMeetingList.data);
  });

  it('isFetching=true일 때 SearchSkeleton이 보여야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: undefined,
      isLoading: true,
      isFetching: true,
    });
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    renderWithNuqs(<SearchPage initialData={null} />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('hasNextPage=false일 때 "더 이상 모임이 없습니다" 텍스트가 보여야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      hasNextPage: false,
      isFetching: false,
    });
    renderWithNuqs(<SearchPage initialData={null} />);
    expect(screen.getByText('더 이상 모임이 없습니다.')).toBeInTheDocument();
  });

  it('hasNextPage=true이고 isFetching=false일 때 "더 이상 모임이 없습니다" 텍스트가 보이지 않아야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      hasNextPage: true,
      isFetching: false,
    });

    renderWithNuqs(<SearchPage initialData={null} />);
    expect(screen.queryByText('더 이상 모임이 없습니다.')).not.toBeInTheDocument();
  });

  it('비로그인 + 모임만들기 버튼 클릭 시 로그인 모달이 열려야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: mockInfiniteData(mockEmptyMeetingList),
    });

    renderWithNuqs(<SearchPage initialData={null} />);

    const createMeetingButton = screen.getByRole('button', { name: /모임 만들기/i });
    fireEvent.click(createMeetingButton);

    expect(useAuthStore.getState().isLoginRequired).toBe(true);
  });

  it('로그인 + 모임만들기 버튼 클릭 시 모임 생성 모달이 열려야한다.', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: mockInfiniteData(mockEmptyMeetingList),
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

    renderWithNuqs(<SearchPage initialData={null} />);

    const createMeetingButton = screen.getByRole('button', { name: /모임 만들기/i });
    fireEvent.click(createMeetingButton);

    const makeModal = screen.getByRole('dialog', { name: /모임 생성/i });
    expect(makeModal).toBeInTheDocument();
  });
});
