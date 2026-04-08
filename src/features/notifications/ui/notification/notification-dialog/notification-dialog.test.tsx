import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Notification } from '@/shared/types/generated-client';

import { NotificationDialog } from './notification-dialog';

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
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('NotificationDialog', () => {
  it('열었을 때 패널과 주입한 list가 보인다', async () => {
    const user = userEvent.setup();
    renderWithClient(<NotificationDialog list={testNotifications} />);

    await user.click(screen.getByRole('button', { name: '알림 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('모임 확정')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
  });
});
