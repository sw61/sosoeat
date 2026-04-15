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
const DEFAULT_DATE_START_ISO = '2026-04-15T09:00:00.000Z';

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

const mockHost: Host = {
  id: 1,
  name: '테스트호스트',
  image: 'https://example.com/images/host-1.jpg',
};

const createMockMeeting = (overrides: Partial<MeetingWithHost> = {}): MeetingWithHost => ({
  id: 1,
  teamId: 'team-abc',
  name: '강남 점심 같이 먹어요',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울시 강남구 테헤란로 123',
  latitude: 37.498095,
  longitude: 127.02761,
  dateTime: new Date('2026-04-15T12:00:00'),
  registrationEnd: new Date('2026-04-14T23:59:59'),
  capacity: 6,
  participantCount: 3,
  image: 'https://example.com/images/meeting-1.jpg',
  description: '강남에서 함께 점심 먹을 분을 모집합니다.',
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

const mockMeetingList: MeetingList = {
  data: [
    createMockMeeting({ id: 1, name: '강남 점심 같이 먹어요', type: 'groupEat' }),
    createMockMeeting({
      id: 2,
      name: '생필품 공동구매 모임',
      type: 'groupBuy',
      region: '서울 마포구',
      address: '서울시 마포구 월드컵로 456',
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

const mockEmptyMeetingList: MeetingList = {
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

  it('isLoading일 때 SearchSkeleton을 노출한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: undefined,
      isLoading: true,
    });
    const { result } = renderHookWithNuqs(() => useSearchPage(null, DEFAULT_DATE_START_ISO));
    expect(result.current.isLoading).toBe(true);
  });

  it('isError일 때 에러 상태를 반환한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      isError: true,
    });
    const { result } = renderHookWithNuqs(() => useSearchPage(null, DEFAULT_DATE_START_ISO));
    expect(result.current.isError).toBe(true);
  });

  it('meetingData가 비어 있으면 Empty Page를 보여준다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: mockInfiniteData(mockEmptyMeetingList),
    });
    renderWithNuqs(
      <SearchPage initialData={null} initialDefaultDateStartIso={DEFAULT_DATE_START_ISO} />
    );
    expect(screen.getAllByAltText('Empty Page')).toHaveLength(2);
  });

  it('meetingData가 있으면 검색 결과를 반환한다', () => {
    const { result } = renderHookWithNuqs(() => useSearchPage(null, DEFAULT_DATE_START_ISO));
    expect(result.current.meetingData).toEqual(mockMeetingList.data);
  });

  it('isFetching 상태면 skeleton이 보인다', () => {
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

    renderWithNuqs(
      <SearchPage initialData={null} initialDefaultDateStartIso={DEFAULT_DATE_START_ISO} />
    );
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('다음 페이지가 없으면 종료 문구를 보여준다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      hasNextPage: false,
      isFetching: false,
    });
    renderWithNuqs(
      <SearchPage initialData={null} initialDefaultDateStartIso={DEFAULT_DATE_START_ISO} />
    );
    expect(screen.getByText('더 이상 모임이 없습니다.')).toBeInTheDocument();
  });

  it('다음 페이지가 있으면 종료 문구를 숨긴다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      hasNextPage: true,
      isFetching: false,
    });

    renderWithNuqs(
      <SearchPage initialData={null} initialDefaultDateStartIso={DEFAULT_DATE_START_ISO} />
    );
    expect(screen.queryByText('더 이상 모임이 없습니다.')).not.toBeInTheDocument();
  });

  it('비로그인 상태에서 모임 만들기 버튼을 누르면 로그인 모달 상태가 열린다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: mockInfiniteData(mockEmptyMeetingList),
    });

    renderWithNuqs(
      <SearchPage initialData={null} initialDefaultDateStartIso={DEFAULT_DATE_START_ISO} />
    );

    const createMeetingButton = screen.getByRole('button', { name: /모임 만들기/i });
    fireEvent.click(createMeetingButton);

    expect(useAuthStore.getState().isLoginRequired).toBe(true);
  });

  it('로그인 상태에서 모임 만들기 버튼을 누르면 모임 생성 모달이 열린다', () => {
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

    renderWithNuqs(
      <SearchPage initialData={null} initialDefaultDateStartIso={DEFAULT_DATE_START_ISO} />
    );

    const createMeetingButton = screen.getByRole('button', { name: /모임 만들기/i });
    fireEvent.click(createMeetingButton);

    const makeModal = screen.getByRole('dialog', { name: /모임 생성/i });
    expect(makeModal).toBeInTheDocument();
  });
});
