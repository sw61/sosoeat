import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAuthStore } from '@/entities/auth';

import { MeetingCommentSection } from './meeting-comment-section';

const mockMutate = jest.fn();

jest.mock('@/entities/meeting-comment', () => ({
  ...jest.requireActual('@/entities/meeting-comment'),
  useComments: jest.fn(() => ({ data: [] })),
  useCommentCount: jest.fn(() => ({ data: { count: 0 } })),
}));

jest.mock('@/features/meeting-comment', () => ({
  useCreateComment: jest.fn(() => ({ mutate: mockMutate, isPending: false })),
}));

jest.mock('@/shared/ui/comment-input', () => ({
  CommentInput: jest.requireActual('@/shared/ui/comment-input').CommentInput,
}));

const MOCK_USER = { id: 1, name: '홍길동', email: 'test@example.com' };

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
  mockMutate.mockClear();
});

describe('MeetingCommentSection', () => {
  describe('비로그인 상태', () => {
    it('입력창이 비활성화된다', () => {
      render(<MeetingCommentSection meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('로그인 안내 placeholder가 표시된다', () => {
      render(<MeetingCommentSection meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(
        screen.getByPlaceholderText('로그인 후 댓글을 작성할 수 있습니다.')
      ).toBeInTheDocument();
    });
  });

  describe('로그인 상태', () => {
    beforeEach(() => {
      useAuthStore.setState({ user: MOCK_USER, isAuthenticated: true });
    });

    it('입력창이 활성화된다', () => {
      render(<MeetingCommentSection meetingId={1} />, {
        wrapper: createWrapper(),
      });

      expect(screen.getByRole('textbox')).not.toBeDisabled();
    });

    it('텍스트 입력 후 제출하면 입력창이 초기화된다', async () => {
      const user = userEvent.setup();
      render(<MeetingCommentSection meetingId={1} />, {
        wrapper: createWrapper(),
      });

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, '새 댓글입니다');
      expect(textarea).toHaveValue('새 댓글입니다');

      await user.click(screen.getByRole('button', { name: '댓글 전송' }));
      expect(textarea).toHaveValue('');
    });
  });
});
