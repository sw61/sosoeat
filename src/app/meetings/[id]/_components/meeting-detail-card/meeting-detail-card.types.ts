import type { ReactNode } from 'react';

import type { Meeting } from '@/types/meeting';

export type MeetingRole = 'guest' | 'participant' | 'host';
export type MeetingStatus = 'open' | 'closed' | 'confirmed' | 'full';

export interface MeetingDetailCardProps {
  meeting: Meeting;
  role: MeetingRole;
  status: MeetingStatus;
  isJoined: boolean;
  isLiked: boolean;
  timerBadge?: ReactNode;
  likeButton?: ReactNode;
  onJoin?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
