import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MeetingCommentItem } from './meeting-comment-item';
import type { MeetingComment } from './meeting-comment-section.types';

jest.mock('@/entities/auth', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/features/meeting-comment', () => ({
  useLikeComment: jest.fn(() => ({ mutate: jest.fn() })),
  useUpdateComment: jest.fn(() => ({ mutate: jest.fn() })),
  useDeleteComment: jest.fn(() => ({ mutate: jest.fn() })),
  useCreateComment: jest.fn(() => ({ mutate: jest.fn() })),
}));

jest.mock('./format-date', () => ({
  formatCommentDate: jest.fn((date: string) => date),
  formatCommentRelativeTime: jest.fn(() => '2시간 전'),
}));

const { useAuthStore } = jest.requireMock('@/entities/auth') as {
  useAuthStore: jest.Mock;
};

const mockComment: MeetingComment = {
  id: 1,
  parentId: null,
  author: { nickname: '마루', profileUrl: null },
  content: '안녕하세요. 이 모임 참여 가능할까요?',
  isDeleted: false,
  createdAt: '03/12',
  likeCount: 3,
  isLiked: false,
  isHostComment: false,
  isMine: false,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('MeetingCommentItem', () => {
  beforeEach(() => {
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: {
        name: '마루',
        image: null,
      },
    });
  });

  it('renders author, content, date, relative time, and like count', () => {
    render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('마루')).toBeInTheDocument();
    expect(screen.getByText('안녕하세요. 이 모임 참여 가능할까요?')).toBeInTheDocument();
    expect(screen.getByText('03/12')).toBeInTheDocument();
    expect(screen.getByText('2시간 전')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('keeps the root comment avatar at sosotalk size', () => {
    const { container } = render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
      wrapper: createWrapper(),
    });

    expect(container.querySelector('[class*="h-\\[54px\\]"]')).toBeInTheDocument();
  });

  describe('host badge', () => {
    it('shows the host badge for host comments', () => {
      render(
        <MeetingCommentItem comment={{ ...mockComment, isHostComment: true }} meetingId={1} />,
        {
          wrapper: createWrapper(),
        }
      );

      const badge = screen.getByText('작성자');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-sosoeat-orange-100');
    });

    it('does not show the host badge for non-host comments', () => {
      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.queryByText('작성자')).not.toBeInTheDocument();
    });
  });

  describe('ellipsis menu', () => {
    it('shows the menu button for my comment', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isMine: true }} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByRole('button', { name: '더보기' })).toBeInTheDocument();
    });

    it('hides the menu button for other users comments', () => {
      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.queryByRole('button', { name: '더보기' })).not.toBeInTheDocument();
    });
  });

  describe('deleted comments', () => {
    it('shows the deleted message', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isDeleted: true }} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByText('삭제된 댓글입니다.')).toBeInTheDocument();
    });

    it('hides like and reply actions', () => {
      render(
        <MeetingCommentItem
          comment={{ ...mockComment, isDeleted: true, isMine: true }}
          meetingId={1}
        />,
        {
          wrapper: createWrapper(),
        }
      );

      expect(screen.queryByRole('button', { name: '좋아요' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '답글' })).not.toBeInTheDocument();
    });
  });

  describe('like action', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('calls the like mutation after 300ms', async () => {
      const mockMutate = jest.fn();
      const commentsModule = jest.mocked(
        jest.requireMock('@/features/meeting-comment') as { useLikeComment: jest.Mock }
      );
      commentsModule.useLikeComment.mockReturnValue({ mutate: mockMutate });

      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      await user.click(screen.getByRole('button', { name: '좋아요' }));
      jest.advanceTimersByTime(300);

      expect(mockMutate).toHaveBeenCalledWith(
        { commentId: 1, isLiked: false },
        expect.objectContaining({ onError: expect.any(Function) })
      );
    });

    it('debounces rapid clicks into one mutation', async () => {
      const mockMutate = jest.fn();
      const commentsModule = jest.mocked(
        jest.requireMock('@/features/meeting-comment') as { useLikeComment: jest.Mock }
      );
      commentsModule.useLikeComment.mockReturnValue({ mutate: mockMutate });

      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      await user.click(screen.getByRole('button', { name: '좋아요' }));
      await user.click(screen.getByRole('button', { name: '좋아요' }));
      await user.click(screen.getByRole('button', { name: '좋아요' }));
      jest.advanceTimersByTime(300);

      expect(mockMutate).toHaveBeenCalledTimes(1);
    });
  });

  describe('replies', () => {
    it('applies the reply background style for nested replies', () => {
      const { container } = render(
        <MeetingCommentItem comment={{ ...mockComment, parentId: 1 }} isReply meetingId={1} />,
        { wrapper: createWrapper() }
      );

      expect(container.querySelector('article')).toHaveClass('bg-sosoeat-orange-100');
    });

    it('shows a collapsed reply toggle for top-level comments with replies', () => {
      render(
        <MeetingCommentItem
          comment={{
            ...mockComment,
            replies: [
              {
                ...mockComment,
                id: 2,
                parentId: 1,
                author: { nickname: '이소라', profileUrl: null },
              },
            ],
          }}
          meetingId={1}
        />,
        { wrapper: createWrapper() }
      );

      expect(screen.getByRole('button', { name: '답글 1개 보기' })).toBeInTheDocument();
      expect(screen.queryByText('이소라')).not.toBeInTheDocument();
    });

    it('keeps replies collapsed by default even when my reply exists', () => {
      render(
        <MeetingCommentItem
          comment={{
            ...mockComment,
            replies: [
              {
                ...mockComment,
                id: 2,
                parentId: 1,
                isMine: true,
                author: { nickname: '내 답글', profileUrl: null },
              },
            ],
          }}
          meetingId={1}
        />,
        { wrapper: createWrapper() }
      );

      expect(screen.getByRole('button', { name: '답글 1개 보기' })).toBeInTheDocument();
      expect(screen.queryByText('내 답글')).not.toBeInTheDocument();
    });

    it('expands and collapses replies with the toggle button', async () => {
      const user = userEvent.setup();

      render(
        <MeetingCommentItem
          comment={{
            ...mockComment,
            replies: [
              {
                ...mockComment,
                id: 2,
                parentId: 1,
                author: { nickname: '이소라', profileUrl: null },
              },
            ],
          }}
          meetingId={1}
        />,
        { wrapper: createWrapper() }
      );

      await user.click(screen.getByRole('button', { name: '답글 1개 보기' }));
      expect(screen.getByText('이소라')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '답글 숨기기' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: '답글 숨기기' }));
      expect(screen.queryByText('이소라')).not.toBeInTheDocument();
    });

    it('shows the reply button only for top-level comments', () => {
      const { rerender } = render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByRole('button', { name: '답글' })).toBeInTheDocument();

      rerender(
        <QueryClientProvider
          client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
        >
          <MeetingCommentItem comment={{ ...mockComment, parentId: 1 }} isReply meetingId={1} />
        </QueryClientProvider>
      );

      expect(screen.queryByRole('button', { name: '답글' })).not.toBeInTheDocument();
    });

    it('clears reply textarea after closing and reopening', async () => {
      const user = userEvent.setup();

      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      await user.click(screen.getByRole('button', { name: '답글' }));

      const textarea = screen.getByPlaceholderText('답글을 입력하세요.');
      await user.type(textarea, 'reply draft');
      await user.click(screen.getByRole('button', { name: '취소' }));

      await user.click(screen.getByRole('button', { name: '답글' }));

      expect(screen.getByPlaceholderText('답글을 입력하세요.')).toHaveValue('');
    });
  });
});
