import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Notification } from '@/shared/types/generated-client';

import { useNotificationReadActions } from '../../../model/use-notification-read-actions';

import { NotificationItem } from './notification-item';

jest.mock('../../../model/use-notification-read-actions');
jest.mock('./notification-item.thumbnail', () => ({
  NotificationItemThumbnail: () => <div data-testid="thumbnail" />,
}));

const mockMarkAsRead = jest.fn();
const mockDeleteNotification = jest.fn();

const baseNotification: Notification = {
  id: 1,
  teamId: 'dallaem',
  userId: 1,
  type: 'MEETING_CONFIRMED',
  message: '모임이 확정되었습니다.',
  data: { meetingName: 'Team Sync' },
  isRead: false,
  createdAt: new Date('2025-01-15T12:00:00Z'),
};

beforeEach(() => {
  jest.clearAllMocks();
  (useNotificationReadActions as jest.Mock).mockReturnValue({
    markAsRead: mockMarkAsRead,
    deleteNotification: mockDeleteNotification,
  });
});

describe('NotificationItem', () => {
  it('제목과 설명을 렌더한다', () => {
    render(<NotificationItem {...baseNotification} />);

    expect(screen.getByText('모임 확정')).toBeInTheDocument();
    expect(screen.getByText('모임이 확정되었습니다.')).toBeInTheDocument();
  });

  it('읽음 처리 버튼 클릭 시 markAsRead를 호출한다', async () => {
    const user = userEvent.setup();
    render(<NotificationItem {...baseNotification} />);

    await user.click(screen.getByRole('button', { name: '모임 확정 알림 읽음 처리' }));

    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
  });

  it('삭제 버튼 클릭 시 deleteNotification을 호출한다', async () => {
    const user = userEvent.setup();
    render(<NotificationItem {...baseNotification} />);

    await user.click(screen.getByRole('button', { name: '알림 삭제' }));

    expect(mockDeleteNotification).toHaveBeenCalledTimes(1);
  });

  it('삭제 버튼 클릭 시 markAsRead를 호출하지 않는다', async () => {
    const user = userEvent.setup();
    render(<NotificationItem {...baseNotification} />);

    await user.click(screen.getByRole('button', { name: '알림 삭제' }));

    expect(mockMarkAsRead).not.toHaveBeenCalled();
  });

  it('읽지 않은 알림은 강조 배경을 렌더한다', () => {
    const { container } = render(<NotificationItem {...baseNotification} isRead={false} />);

    expect(container.firstChild).toHaveClass('bg-sosoeat-orange-100');
  });

  it('읽은 알림은 강조 배경을 렌더하지 않는다', () => {
    const { container } = render(<NotificationItem {...baseNotification} isRead={true} />);

    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).not.toHaveClass('bg-sosoeat-orange-100');
  });

  it('button[role] 중첩이 없다 — 읽음/삭제 버튼이 독립적이다', () => {
    render(<NotificationItem {...baseNotification} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((btn) => {
      expect(btn.querySelector('button')).toBeNull();
    });
  });

  it('썸네일을 렌더한다', () => {
    render(<NotificationItem {...baseNotification} />);

    expect(screen.getByTestId('thumbnail')).toBeInTheDocument();
  });
});
