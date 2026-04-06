'use client';

import { useAuthStore } from '@/entities/auth';
import type { Meeting } from '@/entities/meeting';

import type {
  MeetingRole,
  MeetingStatus,
} from '../../meeting-detail-card/meeting-detail-card.types';
import { getMeetingStatus } from '../../meeting-detail-card/meeting-detail-card.utils';

interface UseMeetingRoleResult {
  role: MeetingRole;
  status: MeetingStatus;
  isJoined: boolean;
}

export function useMeetingRole(meeting: Meeting): UseMeetingRoleResult {
  const user = useAuthStore((s) => s.user);

  const isHost = user != null && user.id === meeting.hostId;
  const isJoined = meeting.isJoined ?? false;
  const role: MeetingRole = isHost ? 'host' : isJoined ? 'participant' : 'guest';
  const status: MeetingStatus = getMeetingStatus(meeting);

  return { role, status, isJoined };
}
