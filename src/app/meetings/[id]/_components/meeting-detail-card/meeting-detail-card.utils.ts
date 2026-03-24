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
