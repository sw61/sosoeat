import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { notificationApi } from '@/components/common/notification/repository/api';
import type { Notification } from '@/types/generated-client';

import { NotificationTab } from './notification-tab';

const meetingConfirmed: Notification = {
  id: 1,
  teamId: 'dallaem',
  userId: 1,
  type: 'MEETING_CONFIRMED',
  message: 'm',
  data: { meetingName: '테스트 모임' },
  isRead: false,
  createdAt: new Date('2025-01-15T12:00:00Z'),
};

describe('NotificationTab', () => {
  beforeEach(() => {
    jest.spyOn(notificationApi, 'readNotification').mockResolvedValue({ ok: true } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('제목·메타를 표시하고 설명을 비동기로 채운다', async () => {
    render(<NotificationTab {...meetingConfirmed} />);

    expect(screen.getByText('모임 확정')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('m')).toBeInTheDocument();
    });
  });

  it('버튼이 잘 동작하는지', async () => {
    render(<NotificationTab {...meetingConfirmed} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(notificationApi.readNotification).toHaveBeenCalledWith({
        notificationId: 1,
      });
    });
  });
});
