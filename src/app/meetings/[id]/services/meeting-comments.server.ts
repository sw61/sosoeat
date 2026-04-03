import { commentServer } from '@/lib/http/comment-server';
import type { Meeting } from '@/types/meeting';

import type { MeetingComment } from '../_components/meeting-comment-section/meeting-comment-section.types';

/**
 * 댓글 서버에 모임 행이 없으면 GET이 404를 반환합니다.
 * 생성 직후 동기화 누락·기존 데이터 등으로 404일 때 POST /meetings 로 등록한 뒤 다시 조회합니다.
 */
export async function fetchMeetingCommentsForPage(
  meetingId: number,
  meeting: Meeting
): Promise<MeetingComment[]> {
  let response = await commentServer.get(`/meetings/${meetingId}/comments`);

  if (response.status === 404 && meeting.teamId) {
    const syncResponse = await commentServer.post('/meetings', {
      id: meeting.id,
      hostId: meeting.hostId,
      teamId: meeting.teamId,
    });
    if (syncResponse.ok) {
      response = await commentServer.get(`/meetings/${meetingId}/comments`);
    }
  }

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as MeetingComment[];
}
