import { useInView } from 'react-intersection-observer';

import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing';

import { useAuthStore } from '@/entities/auth';

import { SearchScreen } from './search-screen';

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

jest.mock('@/features/meeting-create', () => ({
  MeetingCreateModal: () => null,
  MeetingMakeButton: ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick}>
      모임 만들기
    </button>
  ),
  useMeetingCreateTrigger: () => ({
    handleOpen: jest.fn(),
    isOpen: false,
    close: jest.fn(),
    createMeeting: jest.fn(),
  }),
}));

const NuqsWrapper = withNuqsTestingAdapter({ searchParams: {} });

const renderWithNuqs = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <NuqsWrapper>{children}</NuqsWrapper>
      </QueryClientProvider>
    ),
  });
};

const defaultInfiniteReturn = {
  data: {
    pages: [{ data: [], nextCursor: '', hasMore: false }],
    pageParams: [undefined],
  },
  isLoading: false,
  isError: false,
  hasNextPage: false,
  isFetching: false,
  isFetchingNextPage: false,
  fetchNextPage: jest.fn(),
};

describe('SearchScreen', () => {
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

  it('renders the empty state when there are no meetings', () => {
    renderWithNuqs(<SearchScreen initialData={null} />);

    expect(screen.getAllByAltText('Empty Page')).toHaveLength(2);
  });

  it('renders the end-of-results message when pagination is complete', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...defaultInfiniteReturn,
      data: {
        pages: [
          {
            data: [
              {
                id: 1,
                teamId: 'team-abc',
                name: 'Test meeting',
                type: 'groupEat',
                region: 'Seoul Gangnam',
                address: '123 Test Road',
                latitude: 37.5,
                longitude: 127.0,
                dateTime: new Date('2026-04-15T12:00:00'),
                registrationEnd: new Date('2026-04-14T23:59:59'),
                capacity: 6,
                participantCount: 3,
                image: 'https://example.com/meeting.jpg',
                description: 'Test description',
                canceledAt: new Date('1970-01-01T00:00:00'),
                confirmedAt: new Date('2026-04-10T10:00:00'),
                hostId: 1,
                createdBy: 1,
                createdAt: new Date('2026-04-06T09:00:00'),
                updatedAt: new Date('2026-04-06T09:00:00'),
                host: {
                  id: 1,
                  name: 'Host',
                  image: 'https://example.com/host.jpg',
                },
                isFavorited: false,
                isJoined: false,
                isCompleted: false,
              },
            ],
            nextCursor: '',
            hasMore: false,
          },
        ],
        pageParams: [undefined],
      },
    });

    renderWithNuqs(<SearchScreen initialData={null} />);

    expect(screen.getByText('더 이상 모임이 없습니다.')).toBeInTheDocument();
  });
});
