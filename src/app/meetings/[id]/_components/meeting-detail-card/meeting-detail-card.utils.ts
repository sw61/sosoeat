import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import type { Meeting } from '@/types/meeting';

import type { MeetingRole, MeetingStatus } from './meeting-detail-card.types';

export const getMeetingStatus = (meeting: Meeting): MeetingStatus => {
  if (meeting.canceledAt) return 'closed';
  if (meeting.confirmedAt) return 'confirmed';
  if (meeting.participantCount >= meeting.capacity) return 'full';
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
