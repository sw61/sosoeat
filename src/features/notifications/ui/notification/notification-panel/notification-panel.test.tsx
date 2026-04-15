import { useInView } from 'react-intersection-observer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Notification } from '@/shared/types/generated-client';

import { useNotificationInfiniteList } from '../../../model/notification.queries';
import { useNotificationReadActions } from '../../../model/use-notification-read-actions';

import { NotificationPanel } from './notification-panel';

const mockData: Notification[] = [
  {
    id: 1,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '모임이 확정되었습니다.',
    data: { meetingName: 'Team Sync' },
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

const mockReturn = (overrides: object) => ({
  isPending: false,
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  isFetchingNextPage: false,
  error: null,
  data: { pages: [] },
  ...overrides,
});

jest.mock('@/features/notifications/model/notification.queries', () => ({
  useNotificationInfiniteList: jest.fn(),
  prefetchNotificationInfiniteList: jest.fn().mockResolvedValue(undefined),
  notificationKeys: {
    list: jest.fn(() => ['notifications', 'list']),
    unreadCount: jest.fn(() => ['notifications', 'unread-count']),
  },
}));

jest.mock('@/features/notifications/model/use-notification-read-actions', () => ({
  useNotificationReadActions: jest.fn(),
}));

jest.mock('@/features/notifications/api/notifications.server', () => ({
  getNotificationListServer: jest
    .fn()
    .mockResolvedValue({ data: [], hasMore: false, nextCursor: '' }),
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

const renderOpenPanel = (overrides: Partial<Parameters<typeof NotificationPanel>[0]> = {}) => {
  const onOpenChange = jest.fn();
  renderWithClient(<NotificationPanel open={true} onOpenChange={onOpenChange} {...overrides} />);
  return { onOpenChange };
};

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

beforeEach(() => {
  mockMatchMedia(false);
  (useNotificationReadActions as jest.Mock).mockReturnValue({
    markAllAsRead: jest.fn(),
    markAsRead: jest.fn(),
    deleteNotification: jest.fn(),
    deleteAllNotifications: jest.fn(),
  });
  (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: false });
  (useNotificationInfiniteList as jest.Mock).mockReturnValue(mockReturn({}));
});

describe('NotificationPanel', () => {
  it('열린 상태에서 제목과 모두 읽기 버튼을 렌더한다', () => {
    renderOpenPanel({ unreadCount: 1 });

    expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
  });

  it('로딩 중일 때 로더를 렌더한다', () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(mockReturn({ isPending: true }));
    renderOpenPanel();

    expect(document.querySelector('.loader')).toBeInTheDocument();
  });

  it('오류 발생 시 오류 메시지를 렌더한다', () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(
      mockReturn({ error: new Error('API 오류') })
    );
    renderOpenPanel();

    expect(screen.getByText('알림을 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
  });

  it('마지막 페이지에 도달하면 "모든 알림을 불러왔어요" 메시지를 렌더한다', () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(
      mockReturn({ data: { pages: [{ data: mockData }] } })
    );
    renderOpenPanel({ unreadCount: 1 });

    expect(screen.getByText('모든 알림을 불러왔어요')).toBeInTheDocument();
  });

  it('다음 페이지가 있을 때 "모든 알림을 불러왔어요" 메시지를 렌더하지 않는다', () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(
      mockReturn({ hasNextPage: true, data: { pages: [{ data: mockData }] } })
    );
    renderOpenPanel({ unreadCount: 1 });

    expect(screen.queryByText('모든 알림을 불러왔어요')).not.toBeInTheDocument();
  });

  it('알림이 없을 때 "알림이 없어요" 메시지를 렌더한다', () => {
    renderOpenPanel();

    expect(screen.getByText('알림이 없어요')).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onOpenChange(false)를 호출한다 (PC)', async () => {
    const { onOpenChange } = renderOpenPanel();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '알림 닫기' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('닫기 버튼 클릭 시 onOpenChange(false)를 호출한다 (모바일)', async () => {
    mockMatchMedia(true);
    const { onOpenChange } = renderOpenPanel();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: '알림 닫기' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
