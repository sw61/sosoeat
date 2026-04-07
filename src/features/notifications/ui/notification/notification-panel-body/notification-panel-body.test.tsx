import { useInView } from 'react-intersection-observer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { Notification } from '@/shared/types/generated-client';

import { useNotificationReadActions } from '../../../model/use-notification-read-actions';
import { useNotificationInfiniteListRead } from '../../../model/use-notification-service';

import { NotificationPanelBody } from './notification-panel-body';

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

jest.mock('@/features/notifications/model/use-notification-service', () => ({
  useNotificationInfiniteListRead: jest.fn(),
}));

jest.mock('@/features/notifications/model/use-notification-read-actions', () => ({
  useNotificationReadActions: jest.fn(),
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

beforeEach(() => {
  (useNotificationReadActions as jest.Mock).mockReturnValue({
    markAllAsRead: jest.fn(),
    markAsRead: jest.fn(),
  });
  (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: false });
});

describe('NotificationPanelBody', () => {
  it('제목과 모두 읽기 버튼을 렌더한다', () => {
    (useNotificationInfiniteListRead as jest.Mock).mockReturnValue({
      isLoading: false,
      isPending: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
      list: [],
    });

    renderWithClient(
      <NotificationPanelBody
        titleId="notification-title"
        listScrollClassName="scroll-area"
        unreadCount={1}
      />
    );

    expect(screen.getByRole('heading', { name: '알림 내역' })).toHaveAttribute(
      'id',
      'notification-title'
    );
    expect(screen.getByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
  });

  it('로딩 중일 때 로더를 렌더한다', () => {
    (useNotificationInfiniteListRead as jest.Mock).mockReturnValue({
      isLoading: true,
      isPending: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
      list: [],
    });

    renderWithClient(
      <NotificationPanelBody titleId="notification-title" listScrollClassName="scroll-area" />
    );

    expect(document.querySelector('.loader')).toBeInTheDocument();
  });

  it('오류 발생 시 오류 메시지를 렌더한다', () => {
    (useNotificationInfiniteListRead as jest.Mock).mockReturnValue({
      isLoading: false,
      isPending: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: new Error('API 오류'),
      list: [],
    });

    renderWithClient(
      <NotificationPanelBody titleId="notification-title" listScrollClassName="scroll-area" />
    );

    expect(screen.getByText('알림을 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
  });

  it('마지막 페이지에 도달하면 "더 이상 알림이 없습니다" 메시지를 렌더한다', () => {
    (useNotificationInfiniteListRead as jest.Mock).mockReturnValue({
      isLoading: false,
      isPending: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      error: null,
      list: mockData,
    });

    renderWithClient(
      <NotificationPanelBody
        titleId="notification-title"
        listScrollClassName="scroll-area"
        unreadCount={1}
      />
    );

    expect(screen.getByText('더 이상 알림이 없습니다.')).toBeInTheDocument();
  });

  it('다음 페이지가 있을 때 "더 이상 알림이 없습니다" 메시지를 렌더하지 않는다', () => {
    (useNotificationInfiniteListRead as jest.Mock).mockReturnValue({
      isLoading: false,
      isPending: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      error: null,
      list: mockData,
    });

    renderWithClient(
      <NotificationPanelBody
        titleId="notification-title"
        listScrollClassName="scroll-area"
        unreadCount={1}
      />
    );

    expect(screen.queryByText('더 이상 알림이 없습니다.')).not.toBeInTheDocument();
  });
});
