import { render, screen, waitFor } from '@testing-library/react';

import { postsApi } from '@/lib/api-client';
import type { CommentList, Notification } from '@/types/generated-client';

import { NotificationTab } from './notification-tab';

jest.mock('@/lib/api-client', () => ({
  notificationsApi: {
    teamIdNotificationsNotificationIdReadPut: jest.fn(),
  },
  postsApi: {
    teamIdPostsPostIdCommentsGet: jest.fn(),
  },
}));

const emptyCommentsResponse: CommentList = {
  data: [],
  nextCursor: '',
  hasMore: false,
};

const oneCommentResponse: CommentList = {
  data: [
    {
      id: 1,
      teamId: 'dallaem',
      postId: 1,
      authorId: 1,
      author: { id: 1, name: '딸기', image: '' },
      content: '정말재밌어요:)',
      createdAt: new Date('2025-01-15T12:00:00Z'),
      updatedAt: new Date('2025-01-15T12:00:00Z'),
    },
  ],
  nextCursor: '',
  hasMore: false,
};

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

const commentNotification: Notification = {
  id: 2,
  teamId: 'dallaem',
  userId: 1,
  type: 'COMMENT',
  message: '',
  data: { postId: 1, postTitle: '내 게시글' },
  isRead: true,
  createdAt: new Date('2025-01-15T12:00:00Z'),
};

describe('NotificationTab', () => {
  beforeEach(() => {
    jest.mocked(postsApi.teamIdPostsPostIdCommentsGet).mockResolvedValue(emptyCommentsResponse);
  });

  it('제목·메타를 표시하고 설명을 비동기로 채운다', async () => {
    render(<NotificationTab {...meetingConfirmed} />);

    expect(screen.getByText('모임 확정')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/테스트 모임.*확정/)).toBeInTheDocument();
    });
  });

  it('COMMENT이고 댓글 목록이 비면 폴백 문구를 보여준다', async () => {
    render(<NotificationTab {...commentNotification} />);

    await waitFor(() => {
      expect(
        screen.getByText('클라이밍 어때요?-딸기님의 댓글"정말재밌어요:)"')
      ).toBeInTheDocument();
    });
  });

  it('COMMENT이고 댓글이 있으면 제목·작성자·댓글을 조합해 보여준다', async () => {
    jest.mocked(postsApi.teamIdPostsPostIdCommentsGet).mockResolvedValue(oneCommentResponse);

    render(<NotificationTab {...commentNotification} />);

    await waitFor(() => {
      expect(screen.getByText('내 게시글에 딸기님의 댓글 "정말재밌어요:)"')).toBeInTheDocument();
    });
  });

  it('COMMENT인데 댓글 API가 실패하면 postTitle·message 기반 폴백을 보여준다', async () => {
    jest.mocked(postsApi.teamIdPostsPostIdCommentsGet).mockRejectedValue(new Error('network'));

    render(<NotificationTab {...commentNotification} />);

    await waitFor(() => {
      expect(screen.getByText('내 게시글에 새 댓글이 달렸어요')).toBeInTheDocument();
    });
  });

  it('COMMENT API 실패 시 message가 있으면 message를 본문으로 쓴다', async () => {
    jest.mocked(postsApi.teamIdPostsPostIdCommentsGet).mockRejectedValue(new Error('network'));

    render(<NotificationTab {...commentNotification} message="서버에서 내려준 미리보기 문구" />);

    await waitFor(() => {
      expect(screen.getByText('서버에서 내려준 미리보기 문구')).toBeInTheDocument();
    });
  });
});
