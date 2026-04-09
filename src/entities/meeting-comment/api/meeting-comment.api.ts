import { commentClient } from '@/shared/api/comment-client';

export type MeetingComment = {
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
  replies: MeetingComment[];
};

export type CreateMeetingCommentRequest = {
  content: string;
  parentId?: number | null;
};

export type UpdateMeetingCommentRequest = {
  content: string;
};

export type MeetingCommentCountResponse = {
  count: number;
};

export type SyncMeetingRequest = {
  id: number;
  hostId: number;
  teamId: string;
};

/**
 * [Service Layer] meetingCommentApi
 * comment server와 연동하여 모임 댓글 관련 비동기 작업을 처리합니다.
 * 클라이언트 컴포넌트 전용 (comment-client 사용)
 */
export const meetingCommentApi = {
  async getComments(
    meetingId: number,
    syncMeeting?: SyncMeetingRequest
  ): Promise<MeetingComment[]> {
    let response = await commentClient.get(`/meetings/${meetingId}/comments`);

    if (response.status === 404 && syncMeeting?.teamId) {
      const syncResponse = await commentClient.post('/meetings', {
        id: syncMeeting.id,
        hostId: syncMeeting.hostId,
        teamId: syncMeeting.teamId,
      });
      if (syncResponse.ok) {
        response = await commentClient.get(`/meetings/${meetingId}/comments`);
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글을 불러오는데 실패했습니다.');
    }
    return response.json();
  },

  async getCommentCount(meetingId: number): Promise<MeetingCommentCountResponse> {
    const response = await commentClient.get(`/meetings/${meetingId}/comments/count`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 수를 불러오는데 실패했습니다.');
    }
    return response.json();
  },

  async createComment(
    meetingId: number,
    payload: CreateMeetingCommentRequest
  ): Promise<MeetingComment> {
    const response = await commentClient.post(`/meetings/${meetingId}/comments`, payload);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 작성에 실패했습니다.');
    }
    return response.json();
  },

  async updateComment(
    commentId: number,
    payload: UpdateMeetingCommentRequest
  ): Promise<MeetingComment> {
    const response = await commentClient.patch(`/comments/${commentId}`, payload);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 수정에 실패했습니다.');
    }
    return response.json();
  },

  async deleteComment(commentId: number): Promise<void> {
    const response = await commentClient.delete(`/comments/${commentId}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '댓글 삭제에 실패했습니다.');
    }
  },

  async likeComment(commentId: number): Promise<void> {
    const response = await commentClient.post(`/comments/${commentId}/likes`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '좋아요에 실패했습니다.');
    }
  },

  async unlikeComment(commentId: number): Promise<void> {
    const response = await commentClient.delete(`/comments/${commentId}/likes`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '좋아요 취소에 실패했습니다.');
    }
  },

  async syncCreateMeeting(payload: SyncMeetingRequest): Promise<void> {
    const response = await commentClient.post('/meetings', payload);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 동기화에 실패했습니다.');
    }
  },

  async syncDeleteMeeting(meetingId: number): Promise<void> {
    const response = await commentClient.delete(`/meetings/${meetingId}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 삭제 동기화에 실패했습니다.');
    }
  },
};
