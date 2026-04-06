import { render, screen } from '@testing-library/react';

import { NotificationList } from './notification-list';

jest.mock('@/shared/lib/api-client', () => ({
  postsApi: {
    teamIdPostsPostIdCommentsGet: jest.fn().mockResolvedValue({
      data: [],
      nextCursor: '',
      hasMore: false,
    }),
  },
}));

describe('NotificationList', () => {
  it('샘플 알림 제목이 보인다', () => {
    render(<NotificationList />);
    expect(screen.getAllByText('모임 확정').length).toBe(3);
    expect(screen.getAllByText('모임 취소').length).toBe(2);
    expect(screen.getAllByText('댓글 알림').length).toBe(3);
  });
});
