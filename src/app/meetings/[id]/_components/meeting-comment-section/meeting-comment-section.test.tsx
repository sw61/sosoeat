import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAuthStore } from '@/store/auth-store';

import { MeetingCommentSection } from './meeting-comment-section';
import type { MeetingComment } from './meeting-comment-section.types';

const mockComments: MeetingComment[] = [
  {
    id: 1,
    parentId: null,
    author: { nickname: '마민준', profileUrl: null },
    content: '안녕하세요!',
    isDeleted: false,
    createdAt: '03월 12일',
    likeCount: 3,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
];

const MOCK_USER = { id: 1, name: '홍길동', email: 'test@example.com' };

beforeEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
});

describe('MeetingCommentSection', () => {
  describe('비로그인 상태', () => {
    it('입력창이 비활성화된다', () => {
      render(<MeetingCommentSection comments={mockComments} />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('로그인 안내 placeholder가 표시된다', () => {
      render(<MeetingCommentSection comments={mockComments} />);

      expect(
        screen.getByPlaceholderText('로그인 후 댓글을 작성할 수 있습니다.')
      ).toBeInTheDocument();
    });

    describe('로그인 상태', () => {
      beforeEach(() => {
        useAuthStore.setState({ user: MOCK_USER, isAuthenticated: true });
      });

      it('입력창이 활성화된다', () => {
        render(<MeetingCommentSection comments={mockComments} />);

        expect(screen.getByRole('textbox')).not.toBeDisabled();
      });

      it('텍스트 입력 후 제출하면 입력창이 초기화된다', async () => {
        const user = userEvent.setup();
        render(<MeetingCommentSection comments={mockComments} />);

        const textarea = screen.getByRole('textbox');
        await user.type(textarea, '새 댓글입니다');
        expect(textarea).toHaveValue('새 댓글입니다');

        await user.click(screen.getByRole('button', { name: '댓글 전송' }));
        expect(textarea).toHaveValue('');
      });
    });
  });
});
