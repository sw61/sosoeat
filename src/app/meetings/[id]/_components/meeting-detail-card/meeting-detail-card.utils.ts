import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import type { Meeting } from '@/types/meeting';

import type { MeetingRole, MeetingStatus } from './meeting-detail-card.types';

/**
 * 모임 상태 단일 정의 — 카드 액션 테이블·역할 훅과 동일 규칙을 씁니다.
 * (마감일 경과 또는 정원 만석은 모두 `closed` → 모집 마감 UI)
 */
export const getMeetingStatus = (meeting: Meeting): MeetingStatus => {
  if (meeting.canceledAt != null) return 'closed';
  if (meeting.confirmedAt != null) return 'confirmed';
  const now = new Date();
  if (new Date(meeting.registrationEnd) < now || meeting.participantCount >= meeting.capacity) {
    return 'closed';
  }
  return 'open';
};

export const getMeetingRole = (meeting: Meeting, userId?: number): MeetingRole => {
  if (!userId) return 'guest';
  if (meeting.host.id === userId) return 'host';
  return 'participant';
};

// ── DIP: 날짜 포맷 추상화 ─────────────────────────────────────
// 컴포넌트가 date-fns에 직접 의존하지 않도록 포맷 로직을 격리합니다.

export const formatMeetingDateTime = (dateTime: string): string =>
  format(new Date(dateTime), 'yyyy년 M월 d일 EEEE · HH:mm', { locale: ko });
