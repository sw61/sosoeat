import type { Meeting } from '@/types/meeting';

export type MeetingRole = 'guest' | 'participant' | 'host';
export type MeetingStatus = 'open' | 'closed' | 'confirmed' | 'full';

// ── ISP: 역할별 props 분리 ────────────────────────────────────
// 각 역할에 필요한 props만 받도록 discriminated union으로 설계합니다.
// 호스트가 onJoin을 받거나 게스트가 onEdit을 받는 상황을 컴파일 타임에 방지합니다.

type BaseProps = {
  meeting: Meeting;
  status: MeetingStatus;
  /** 참여·취소·확정·공유 등 메인 액션 API 진행 중 */
  isActionPending?: boolean;
  /** 호스트 모임 삭제 API 진행 중 */
  isDeletePending?: boolean;
};

type GuestProps = BaseProps & {
  role: 'guest';
  onJoin?: () => void;
};

type ParticipantProps = BaseProps & {
  role: 'participant';
  isJoined: boolean;
  onJoin?: () => void;
  onCancel?: () => void;
};

type HostProps = BaseProps & {
  role: 'host';
  onConfirm?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export type MeetingDetailCardProps = GuestProps | ParticipantProps | HostProps;
