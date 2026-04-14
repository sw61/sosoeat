export interface MeetingComment {
  id: number;
  parentId: number | null;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  author: {
    nickname: string;
    profileUrl: string | null;
  };
  likeCount: number;
  isLiked: boolean;
  isHostComment: boolean;
  isMine: boolean;
  replies?: MeetingComment[];
}

export interface MeetingCommentSectionProps {
  meetingId: number;
  /** 댓글 서버에 모임이 없을 때 동기화 후 재조회 (클라이언트 refetch에도 사용) */
  commentSync?: { id: number; hostId: number; teamId: string };
  className?: string;
}
