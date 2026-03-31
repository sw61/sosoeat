import { render, screen } from '@testing-library/react';
import { UserIcon } from 'lucide-react';

import { NotificationTabBody } from './notification-tab-body';

describe('Notification Tab Body', () => {
  it('미팅 확정이 잘나오는지', () => {
    const props = {
      thumbnail: <UserIcon data-testid="thumbnail" />,
      title: '모임 확정',
      isMeetingConfirmed: false,
      userId: 1,
      type: 'MEETING_CONFIRMED',
      message: '알림 메시지',
      metaRight: '5분 전',
      description: '알림 설명',
      highlighted: true,
    };

    render(<NotificationTabBody {...props} />);

    const thumbnail = screen.getByTestId('thumbnail');
    expect(thumbnail).toBeInTheDocument();

    const title = screen.getByText('모임 확정');
    expect(title).toBeInTheDocument();

    const metaRight = screen.getByText('5분 전');
    expect(metaRight).toBeInTheDocument();

    const description = screen.getByText('알림 설명');
    expect(description).toBeInTheDocument();
  });
});
