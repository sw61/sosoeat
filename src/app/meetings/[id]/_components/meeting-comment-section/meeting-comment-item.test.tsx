import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MeetingCommentItem } from './meeting-comment-item';
import type { MeetingComment } from './meeting-comment-section.types';

const mockComment: MeetingComment = {
  id: 1,
  parentId: null,
  author: { nickname: '마민준', profileUrl: null },
  content: '안녕하세요! 혼자 참여하는데 괜찮을까요?',
  isDeleted: false,
  createdAt: '03월 12일',
  likeCount: 3,
  isLiked: false,
  isHostComment: false,
  isMine: false,
};

describe('MeetingCommentItem', () => {
  it('닉네임, 본문, 날짜, 좋아요 수가 렌더링된다', () => {
    render(<MeetingCommentItem comment={mockComment} />);

    expect(screen.getByText('마민준')).toBeInTheDocument();
    expect(screen.getByText('안녕하세요! 혼자 참여하는데 괜찮을까요?')).toBeInTheDocument();
    expect(screen.getByText('03월 12일')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  describe('작성자 뱃지', () => {
    it('isHostComment가 true이면 "작성자" 뱃지가 표시된다', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isHostComment: true }} />);

      expect(screen.getByText('작성자')).toBeInTheDocument();
    });

    it('isHostComment가 false이면 "작성자" 뱃지가 표시되지 않는다', () => {
      render(<MeetingCommentItem comment={mockComment} />);

      expect(screen.queryByText('작성자')).not.toBeInTheDocument();
    });
  });

  describe('수정/삭제 드롭다운', () => {
    it('isMine이 true이면 더보기 버튼이 표시된다', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isMine: true }} />);

      expect(screen.getByRole('button', { name: '더보기' })).toBeInTheDocument();
    });

    it('isMine이 false이면 더보기 버튼이 표시되지 않는다', () => {
      render(<MeetingCommentItem comment={mockComment} />);

      expect(screen.queryByRole('button', { name: '더보기' })).not.toBeInTheDocument();
    });

    it('더보기 클릭 시 수정하기/삭제하기가 표시된다', async () => {
      const user = userEvent.setup();
      render(<MeetingCommentItem comment={{ ...mockComment, isMine: true }} />);

      await user.click(screen.getByRole('button', { name: '더보기' }));

      expect(screen.getByText('수정하기')).toBeInTheDocument();
      expect(screen.getByText('삭제하기')).toBeInTheDocument();
    });
  });

  describe('삭제된 댓글', () => {
    it('isDeleted가 true이면 "삭제된 댓글입니다."가 표시된다', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isDeleted: true }} />);

      expect(screen.getByText('삭제된 댓글입니다.')).toBeInTheDocument();
    });

    it('isDeleted가 true이면 좋아요/수정/삭제 버튼이 표시되지 않는다', () => {
      render(<MeetingCommentItem comment={{ ...mockComment, isDeleted: true, isMine: true }} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('좋아요 토글', () => {
    it('좋아요 버튼 클릭 시 상태가 토글된다', async () => {
      const user = userEvent.setup();
      render(<MeetingCommentItem comment={{ ...mockComment, isLiked: false }} />);

      const likeButton = screen.getByRole('button');
      await user.click(likeButton);

      // 토글 후 fill 클래스가 적용된 Heart 아이콘 확인
      expect(likeButton.querySelector('svg')).toHaveClass('fill-sosoeat-orange-600');
    });

    it('이미 좋아요한 상태에서 클릭하면 토글된다', async () => {
      const user = userEvent.setup();
      render(<MeetingCommentItem comment={{ ...mockComment, isLiked: true }} />);

      const likeButton = screen.getByRole('button');
      await user.click(likeButton);

      expect(likeButton.querySelector('svg')).not.toHaveClass('fill-sosoeat-orange-600');
    });
  });

  describe('대댓글', () => {
    it('isReply가 true이면 배경색 클래스가 적용된다', () => {
      const { container } = render(
        <MeetingCommentItem comment={{ ...mockComment, parentId: 1 }} isReply />
      );

      expect(container.firstChild?.firstChild).toHaveClass('bg-sosoeat-orange-100');
    });

    it('replies가 있으면 대댓글이 렌더링된다', () => {
      const commentWithReplies: MeetingComment = {
        ...mockComment,
        replies: [
          { ...mockComment, id: 2, parentId: 1, author: { nickname: '이소소', profileUrl: null } },
        ],
      };

      render(<MeetingCommentItem comment={commentWithReplies} />);

      expect(screen.getByText('이소소')).toBeInTheDocument();
    });
  });
});
