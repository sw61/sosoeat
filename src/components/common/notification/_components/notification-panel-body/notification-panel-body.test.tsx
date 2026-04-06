import { render, screen } from '@testing-library/react';

import { Notification } from '@/shared/types/generated-client';

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

describe('NotificationPanelBody', () => {
  it('제목과 목록 슬롯을 렌더한다', () => {
    render(
      <NotificationPanelBody
        titleId="notification-title"
        listScrollClassName="scroll-area"
        list={mockData}
      />
    );

    const heading = screen.getByRole('heading', { name: '알림 내역' });
    expect(heading).toHaveAttribute('id', 'notification-title');
    expect(screen.getByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
  });
});
