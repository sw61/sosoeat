import { useInView } from 'react-intersection-observer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Notification } from '@/shared/types/generated-client';

import { useNotificationReadActions } from '../../../model/use-notification-read-actions';
import { useNotificationInfiniteListRead } from '../../../model/use-notification-service';

import { NotificationPopover } from './notification-popover';

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) {
    // eslint-disable-next-line @next/next/no-img-element -- Jest mock for next/image
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  },
}));

jest.mock('@/features/notifications/model/use-notification-service', () => ({
  useNotificationInfiniteListRead: jest.fn(),
  useNotificationService: jest.fn(),
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
  (useNotificationInfiniteListRead as jest.Mock).mockReturnValue({
    isLoading: false,
    isPending: false,
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    error: null,
    list: mockData,
  });
  (useNotificationReadActions as jest.Mock).mockReturnValue({
    markAllAsRead: jest.fn(),
    markAsRead: jest.fn(),
  });
  (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: false });
});

describe('NotificationPopover', () => {
  it('열었을 때 주입한 list가 보인다', async () => {
    const user = userEvent.setup();
    renderWithClient(<NotificationPopover />);

    await user.click(screen.getByRole('button', { name: '알림 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('모임 확정')).toBeInTheDocument();
  });
});
