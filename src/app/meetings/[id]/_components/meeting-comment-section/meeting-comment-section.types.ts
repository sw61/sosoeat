export interface MeetingComment {
  id: number;
  parentId: number | null; // 대댓글이면 부모 댓글 ID, 일반 댓글이면 null
  content: string;
  isDeleted: boolean;
  createdAt: string;

  author: {
    nickname: string;
    profileUrl: string | null;
  };

  likeCount: number;
  isLiked: boolean;

  isHostComment: boolean; // 모임 호스트가 단 댓글 → "작성자" 뱃지
  isMine: boolean; // 내가 단 댓글 → 수정/삭제 버튼

  replies?: MeetingComment[];
}

export interface MeetingCommentSectionProps {
  comments: MeetingComment[];
  commentCount?: number;
  className?: string;
}
