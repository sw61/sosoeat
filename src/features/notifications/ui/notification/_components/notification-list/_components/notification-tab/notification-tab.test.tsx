import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { notificationRepository } from '@/features/notifications/ui/notification/repository';
import { Notification } from '@/shared/types/generated-client';

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

describe('NotificationTab', () => {
  beforeEach(() => {
    jest
      .spyOn(notificationRepository, 'readNotification')
      .mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('알림을 정상 렌더링한다', () => {
    render(<NotificationTab {...testNotifications[0]} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('버튼이 잘 동작하는지', async () => {
    render(<NotificationTab {...testNotifications[0]} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(notificationRepository.readNotification).toHaveBeenCalledWith({
        notificationId: 1,
      });
    });
  });
});
