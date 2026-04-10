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
}));

const { useAuthStore } = jest.requireMock('@/entities/auth') as {
  useAuthStore: jest.Mock;
};

const mockComment: MeetingComment = {
  id: 1,
  parentId: null,
  author: { nickname: '\uB9C8\uB8E8', profileUrl: null },
  content:
    '\uC548\uB155\uD558\uC138\uC694. \uC774 \uBAA8\uC784 \uCC38\uC5EC \uAC00\uB2A5\uD560\uAE4C\uC694?',
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
        name: '\uB9C8\uB8E8',
        image: null,
      },
    });
  });

  it('renders author, content, date, and like count', () => {
    render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('\uB9C8\uB8E8')).toBeInTheDocument();
    expect(
      screen.getByText(
        '\uC548\uB155\uD558\uC138\uC694. \uC774 \uBAA8\uC784 \uCC38\uC5EC \uAC00\uB2A5\uD560\uAE4C\uC694?'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('03/12')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  describe('host badge', () => {
    it('shows the host badge for host comments', () => {
      render(
        <MeetingCommentItem comment={{ ...mockComment, isHostComment: true }} meetingId={1} />,
        {
          wrapper: createWrapper(),
        }
      );

      expect(screen.getByText('\uC791\uC131\uC790')).toBeInTheDocument();
    });

    it('does not show the host badge for non-host comments', () => {
      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.queryByText('\uC791\uC131\uC790')).not.toBeInTheDocument();
    });
  });

  describe('ellipsis menu', () => {
    it('shows the menu button for my comment', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isMine: true }} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByRole('button', { name: '\uB354\uBCF4\uAE30' })).toBeInTheDocument();
    });

    it('hides the menu button for other users comments', () => {
      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      const button = screen.getByRole('button', {
        name: '\uB354\uBCF4\uAE30',
        hidden: true,
      });

      expect(button.parentElement).toHaveClass('invisible');
      expect(button.parentElement).toHaveClass('pointer-events-none');
    });
  });

  describe('deleted comments', () => {
    it('shows the deleted message', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isDeleted: true }} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(
        screen.getByText('\uC0AD\uC81C\uB41C \uB313\uAE00\uC785\uB2C8\uB2E4.')
      ).toBeInTheDocument();
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

      expect(screen.queryByRole('button', { name: '\uC88B\uC544\uC694' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '\uB2F5\uAE00' })).not.toBeInTheDocument();
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

      await user.click(screen.getByRole('button', { name: '\uC88B\uC544\uC694' }));
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

      await user.click(screen.getByRole('button', { name: '\uC88B\uC544\uC694' }));
      await user.click(screen.getByRole('button', { name: '\uC88B\uC544\uC694' }));
      await user.click(screen.getByRole('button', { name: '\uC88B\uC544\uC694' }));
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

      expect(container.firstChild?.firstChild).toHaveClass('bg-sosoeat-orange-100');
    });

    it('renders nested replies', () => {
      const commentWithReplies: MeetingComment = {
        ...mockComment,
        replies: [
          {
            ...mockComment,
            id: 2,
            parentId: 1,
            author: { nickname: '\uC774\uC18C\uB77C', profileUrl: null },
          },
        ],
      };

      render(<MeetingCommentItem comment={commentWithReplies} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByText('\uC774\uC18C\uB77C')).toBeInTheDocument();
    });

    it('shows the reply button only for top-level comments', () => {
      const { rerender } = render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByRole('button', { name: '\uB2F5\uAE00' })).toBeInTheDocument();

      rerender(
        <QueryClientProvider
          client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
        >
          <MeetingCommentItem comment={{ ...mockComment, parentId: 1 }} isReply meetingId={1} />
        </QueryClientProvider>
      );

      expect(screen.queryByRole('button', { name: '\uB2F5\uAE00' })).not.toBeInTheDocument();
    });

    it('clears reply textarea after closing and reopening', async () => {
      const user = userEvent.setup();

      render(<MeetingCommentItem comment={mockComment} meetingId={1} />, {
        wrapper: createWrapper(),
      });

      await user.click(screen.getByRole('button', { name: '\uB2F5\uAE00' }));

      const textarea = screen.getByPlaceholderText(
        '\uB2F5\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694.'
      );
      await user.type(textarea, 'reply draft');
      await user.click(screen.getByRole('button', { name: '\uCDE8\uC18C' }));

      await user.click(screen.getByRole('button', { name: '\uB2F5\uAE00' }));

      expect(
        screen.getByPlaceholderText('\uB2F5\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694.')
      ).toHaveValue('');
    });
  });
});
