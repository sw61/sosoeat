'use client';

import { useInView } from 'react-intersection-observer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Notification } from '@/shared/types/generated-client';

import { useNotificationInfiniteList, useUnreadCount } from '../../model/notification.queries';

import { Notification as Nt } from './notification';

jest.mock('@/features/notifications/model/notification.queries', () => ({
  useNotificationInfiniteList: jest.fn(),
  useUnreadCount: jest.fn(),
  prefetchNotificationInfiniteList: jest.fn().mockResolvedValue(undefined),
  notificationKeys: {
    list: (options?: object) =>
      options ? ['notifications', 'list', options] : ['notifications', 'list'],
    unreadCount: () => ['notifications', 'unread-count'],
  },
}));

jest.mock('@/features/notifications/model/use-notification-read-actions', () => ({
  useNotificationReadActions: jest.fn(() => ({
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
    deleteNotification: jest.fn(),
    deleteAllNotifications: jest.fn(),
  })),
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/features/notifications/api/notifications.server', () => ({
  getNotificationListServer: jest
    .fn()
    .mockResolvedValue({ data: [], hasMore: false, nextCursor: '' }),
}));

const testNotifications: Notification[] = [
  {
    id: 1,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '',
    data: { meetingName: '테스트' },
    isRead: false,
    createdAt: new Date('2025-01-15T12:00:00Z'),
  },
  {
    id: 2,
    teamId: 'dallaem',
    userId: 1,
    type: 'COMMENT',
    message: '새 댓글이 달렸습니다.',
    data: {},
    isRead: true,
    createdAt: new Date('2025-01-15T10:00:00Z'),
  },
];

const mockInfiniteReturn = (overrides: object) => ({
  isPending: false,
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
  error: null,
  data: { pages: [] },
  ...overrides,
});

const MAX_WIDTH_QUERY = '(max-width: 767px)';

function mockMatchMedia(matchesNarrow: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === MAX_WIDTH_QUERY ? matchesNarrow : false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
}

const renderWithClient = (ui: Parameters<typeof render>[0]) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('Notification', () => {
  beforeEach(() => {
    mockMatchMedia(false);
    jest.clearAllMocks();
    (useUnreadCount as jest.Mock).mockReturnValue({ data: 0 });
    (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: false });
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(mockInfiniteReturn({}));
  });

  it('알림 열기 트리거가 표시된다', async () => {
    renderWithClient(<Nt />);
    expect(await screen.findByRole('button', { name: '알림 열기' })).toBeInTheDocument();
  });

  it('triggerClassName이 트리거 버튼에 적용된다', async () => {
    renderWithClient(<Nt triggerClassName="trigger-test-class" />);
    expect(await screen.findByRole('button', { name: '알림 열기' })).toHaveClass(
      'trigger-test-class'
    );
  });

  it('initialUnreadCount가 useUnreadCount에 전달된다', () => {
    renderWithClient(<Nt initialUnreadCount={5} />);
    expect(useUnreadCount).toHaveBeenCalledWith(5);
  });

  it('트리거 클릭 시 알림 내역과 목록이 보인다', async () => {
    const user = userEvent.setup();
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(
      mockInfiniteReturn({ data: { pages: [{ data: testNotifications }] } })
    );

    renderWithClient(<Nt />);
    await user.click(await screen.findByRole('button', { name: '알림 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
    expect(await screen.findByText('모임 확정')).toBeInTheDocument();
  });
});
