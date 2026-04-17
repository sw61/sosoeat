import type { Meeting } from '@/entities/meeting';

import type { MeetingRole, MeetingStatus } from './meeting-detail-card.types';

const SEOUL_TIME_ZONE = 'Asia/Seoul';

export const getMeetingStatus = (meeting: Meeting, referenceNow?: string): MeetingStatus => {
  if (meeting.canceledAt != null) return 'closed';

  const now = new Date(referenceNow ?? Date.now());
  if (new Date(meeting.registrationEnd) < now) return 'closed';
  if (meeting.participantCount >= meeting.capacity) return 'full';
  if (meeting.confirmedAt != null) return 'confirmed';

  return 'open';
};

export const getMeetingRole = (meeting: Meeting, userId?: number): MeetingRole => {
  if (!userId) return 'guest';
  if (meeting.host.id === userId) return 'host';
  return 'participant';
};

export const formatMeetingDateTime = (dateTime: string): string => {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: SEOUL_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date(dateTime));
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}년 ${values.month}월 ${values.day}일 ${values.weekday} · ${values.hour}:${values.minute}`;
};
