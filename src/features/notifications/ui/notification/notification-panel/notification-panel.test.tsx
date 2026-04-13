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

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

const openPanel = async () => {
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: '알림 열기' }));
  await screen.findByRole('dialog');
  return user;
};

beforeEach(() => {
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
  it('트리거 버튼이 렌더된다', () => {
    renderWithClient(<NotificationPanel unreadCount={1} />);
    expect(screen.getByRole('button', { name: '알림 열기' })).toBeInTheDocument();
  });

  it('트리거 클릭 시 제목과 모두 읽기 버튼을 렌더한다', async () => {
    renderWithClient(<NotificationPanel unreadCount={1} />);
    await openPanel();

    expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
  });

  it('로딩 중일 때 로더를 렌더한다', async () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(mockReturn({ isPending: true }));
    renderWithClient(<NotificationPanel />);
    await openPanel();

    expect(document.querySelector('.loader')).toBeInTheDocument();
  });

  it('오류 발생 시 오류 메시지를 렌더한다', async () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(
      mockReturn({ error: new Error('API 오류') })
    );
    renderWithClient(<NotificationPanel />);
    await openPanel();

    expect(screen.getByText('알림을 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
  });

  it('마지막 페이지에 도달하면 "모든 알림을 불러왔어요" 메시지를 렌더한다', async () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(
      mockReturn({ data: { pages: [{ data: mockData }] } })
    );
    renderWithClient(<NotificationPanel unreadCount={1} />);
    await openPanel();

    expect(screen.getByText('모든 알림을 불러왔어요')).toBeInTheDocument();
  });

  it('다음 페이지가 있을 때 "모든 알림을 불러왔어요" 메시지를 렌더하지 않는다', async () => {
    (useNotificationInfiniteList as jest.Mock).mockReturnValue(
      mockReturn({ hasNextPage: true, data: { pages: [{ data: mockData }] } })
    );
    renderWithClient(<NotificationPanel unreadCount={1} />);
    await openPanel();

    expect(screen.queryByText('모든 알림을 불러왔어요')).not.toBeInTheDocument();
  });

  it('알림이 없을 때 "알림이 없어요" 메시지를 렌더한다', async () => {
    renderWithClient(<NotificationPanel />);
    await openPanel();

    expect(screen.getByText('알림이 없어요')).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 패널이 닫힌다', async () => {
    renderWithClient(<NotificationPanel />);
    const user = await openPanel();

    await user.click(screen.getByRole('button', { name: '알림 닫기' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
