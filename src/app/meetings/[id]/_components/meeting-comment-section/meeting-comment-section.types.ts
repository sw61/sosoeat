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
  initialComments?: MeetingComment[];
  className?: string;
}
