import { commentClient } from '@/shared/api/comment-client';
import { parseResponse, parseVoidResponse } from '@/shared/api/parse-response';

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

    return parseResponse<MeetingComment[]>(response, '댓글을 불러오는데 실패했습니다.');
  },

  async getCommentCount(meetingId: number): Promise<MeetingCommentCountResponse> {
    const response = await commentClient.get(`/meetings/${meetingId}/comments/count`);
    return parseResponse<MeetingCommentCountResponse>(
      response,
      '댓글 수를 불러오는데 실패했습니다.'
    );
  },

  async createComment(
    meetingId: number,
    payload: CreateMeetingCommentRequest
  ): Promise<MeetingComment> {
    const response = await commentClient.post(`/meetings/${meetingId}/comments`, payload);
    return parseResponse<MeetingComment>(response, '댓글 작성에 실패했습니다.');
  },

  async updateComment(
    commentId: number,
    payload: UpdateMeetingCommentRequest
  ): Promise<MeetingComment> {
    const response = await commentClient.patch(`/comments/${commentId}`, payload);
    return parseResponse<MeetingComment>(response, '댓글 수정에 실패했습니다.');
  },

  async deleteComment(commentId: number): Promise<void> {
    const response = await commentClient.delete(`/comments/${commentId}`);
    return parseVoidResponse(response, '댓글 삭제에 실패했습니다.');
  },

  async likeComment(commentId: number): Promise<void> {
    const response = await commentClient.post(`/comments/${commentId}/likes`);
    return parseVoidResponse(response, '좋아요에 실패했습니다.');
  },

  async unlikeComment(commentId: number): Promise<void> {
    const response = await commentClient.delete(`/comments/${commentId}/likes`);
    return parseVoidResponse(response, '좋아요 취소에 실패했습니다.');
  },

  async syncCreateMeeting(payload: SyncMeetingRequest): Promise<void> {
    const response = await commentClient.post('/meetings', payload);
    return parseVoidResponse(response, '모임 동기화에 실패했습니다.');
  },

  async syncDeleteMeeting(meetingId: number): Promise<void> {
    const response = await commentClient.delete(`/meetings/${meetingId}`);
    return parseVoidResponse(response, '모임 삭제 동기화에 실패했습니다.');
  },
};
