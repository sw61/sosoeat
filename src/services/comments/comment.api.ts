import { commentClient } from '@/lib/http/comment-client';

export type CommentUser = {
  id: number;
  nickname: string;
  profileUrl: string;
};

export type Comment = {
  id: number;
  content: string;
  isDeleted: boolean;
  likeCount: number;
  isLiked: boolean;
  isHost: boolean;
  user: CommentUser;
  replies: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type CreateCommentRequest = {
  content: string;
  parentId?: number | null;
};

export type UpdateCommentRequest = {
  content: string;
};

export type CommentCountResponse = {
  count: number;
};

export type SyncMeetingRequest = {
  id: number;
  hostId: number;
  teamId: string;
};

/**
 * [Service Layer] commentApi
 * comment server와 연동하여 댓글 관련 비동기 작업을 처리합니다.
 * 클라이언트 컴포넌트 전용 (comment-client 사용)
 */
export const commentApi = {
  /**
   * 모임의 댓글 목록 조회
   * 토큰이 있으면 isLiked / isHost 포함, 없으면 false
   */
  async getComments(meetingId: number): Promise<Comment[]> {
    const response = await commentClient.get(`/meetings/${meetingId}/comments`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글을 불러오는데 실패했습니다.');
    }

    return response.json();
  },

  /**
   * 모임의 댓글 수 조회
   */
  async getCommentCount(meetingId: number): Promise<CommentCountResponse> {
    const response = await commentClient.get(`/meetings/${meetingId}/comments/count`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 수를 불러오는데 실패했습니다.');
    }

    return response.json();
  },

  /**
   * 댓글/대댓글 작성
   * parentId가 있으면 대댓글, 없으면 댓글
   */
  async createComment(meetingId: number, payload: CreateCommentRequest): Promise<Comment> {
    const response = await commentClient.post(`/meetings/${meetingId}/comments`, payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 작성에 실패했습니다.');
    }

    return response.json();
  },

  /**
   * 댓글 수정 (본인만)
   */
  async updateComment(commentId: number, payload: UpdateCommentRequest): Promise<Comment> {
    const response = await commentClient.patch(`/comments/${commentId}`, payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 수정에 실패했습니다.');
    }

    return response.json();
  },

  /**
   * 댓글 삭제 (본인만, 소프트 삭제)
   */
  async deleteComment(commentId: number): Promise<void> {
    const response = await commentClient.delete(`/comments/${commentId}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 삭제에 실패했습니다.');
    }
  },

  /**
   * 댓글 좋아요
   */
  async likeComment(commentId: number): Promise<void> {
    const response = await commentClient.post(`/comments/${commentId}/likes`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '좋아요에 실패했습니다.');
    }
  },

  /**
   * 댓글 좋아요 취소
   */
  async unlikeComment(commentId: number): Promise<void> {
    const response = await commentClient.delete(`/comments/${commentId}/likes`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '좋아요 취소에 실패했습니다.');
    }
  },

  /**
   * 모임 생성 시 comment server DB 동기화
   * 모임 생성 성공 후 hostId를 comment server에 저장해 isHost 판단에 사용
   */
  async syncCreateMeeting(payload: SyncMeetingRequest): Promise<void> {
    const response = await commentClient.post('/meetings', payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 동기화에 실패했습니다.');
    }
  },

  /**
   * 모임 삭제 시 comment server DB 동기화
   */
  async syncDeleteMeeting(meetingId: number): Promise<void> {
    const response = await commentClient.delete(`/meetings/${meetingId}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 삭제 동기화에 실패했습니다.');
    }
  },
};
