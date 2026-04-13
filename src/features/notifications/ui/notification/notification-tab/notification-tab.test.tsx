import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Notification } from '@/shared/types/generated-client';

import { notificationApi } from '../../../api/notifications.api';

import { NotificationTab } from './notification-tab';

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
  {
    id: 3,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CANCELED',
    message: '',
    data: { meetingName: '테스트' },
    isRead: false,
    createdAt: new Date('2025-01-14T12:00:00Z'),
  },
];
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

jest.mock('@/features/notifications/api/notifications.api', () => ({
  notificationApi: {
    markAsRead: jest.fn().mockResolvedValue(true),
  },
}));

describe('NotificationTab', () => {
  beforeEach(() => {
    jest.spyOn(notificationApi, 'markAsRead').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('알림을 정상 렌더링한다', () => {
    renderWithClient(<NotificationTab {...testNotifications[0]} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('버튼이 잘 동작하는지', async () => {
    renderWithClient(<NotificationTab {...testNotifications[0]} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(notificationApi.markAsRead).toHaveBeenCalledWith(1);
    });
  });
});
