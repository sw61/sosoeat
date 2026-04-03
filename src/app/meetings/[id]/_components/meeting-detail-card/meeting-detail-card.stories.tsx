import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Meeting } from '@/types/meeting';

import { MeetingDetailCard } from './meeting-detail-card';
import type { MeetingRole, MeetingStatus } from './meeting-detail-card.types';

type StoryArgs = {
  meeting: Meeting;
  role: MeetingRole;
  status: MeetingStatus;
  isJoined?: boolean;
  onJoin?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const mockMeeting: Meeting = {
  id: 1,
  name: '강남 맛집 탐방 함께해요!',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울 강남구 테헤란로 123 1층',
  latitude: 37.5065,
  longitude: 127.0536,
  dateTime: '2024-03-15T09:30:00.000Z',
  registrationEnd: '2026-05-14T23:59:59.000Z',
  participantCount: 3,
  capacity: 6,
  image: '',
  description: '',
  hostId: 1,
  createdBy: 1,
  updatedAt: '2024/03/01T00:00:00.000Z',
  host: { id: 1, name: '김소소' },
  isFavorited: false,
};

const meta = {
  title: 'app/meetings/[id]/MeetingDetailCard',
  component: MeetingDetailCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
  args: {
    meeting: mockMeeting,
    role: 'participant',
    status: 'open',
  },
} as Meta<typeof MeetingDetailCard>;

export default meta;
type Story = StoryObj<StoryArgs>;

// ── 역할별 ────────────────────────────────────────────

export const GuestView: Story = {
  name: 'Guest — 참여하기',
  args: {
    role: 'guest',
  },
};

export const ParticipantJoin: Story = {
  name: 'Participant — 참여하기',
  args: {
    role: 'participant',
    isJoined: false,
  },
};

export const ParticipantCancel: Story = {
  name: 'Participant — 참여 취소하기',
  args: {
    role: 'participant',
    isJoined: true,
  },
};

export const HostConfirm: Story = {
  name: 'Host — 모임 확정하기',
  args: {
    role: 'host',
    status: 'open',
  },
};

export const HostShare: Story = {
  name: 'Host — 공유하기 (확정 후)',
  args: {
    role: 'host',
    status: 'confirmed',
  },
};

// ── 상태별 ────────────────────────────────────────────

export const ClosedMeeting: Story = {
  name: '마감된 모임',
  args: {
    isJoined: false,
    status: 'closed',
  },
};

export const EstablishedMeeting: Story = {
  name: '개설완료 뱃지',
  args: {
    meeting: { ...mockMeeting, confirmedAt: '2024-03-10T00:00:00.000Z' },
    isJoined: false,
    status: 'confirmed',
  },
};

export const FullParticipants: Story = {
  name: '참여 인원 가득 (100%)',
  args: {
    meeting: { ...mockMeeting, participantCount: 6, capacity: 6 },
    isJoined: false,
    status: 'full',
  },
};

// ── 카테고리 / 찜 ─────────────────────────────────────

export const GroupBuyCategory: Story = {
  name: '공동구매 카테고리',
  args: {
    meeting: { ...mockMeeting, type: 'groupBuy' },
    role: 'participant',
    isJoined: false,
  },
};

export const LikedState: Story = {
  name: '찜한 상태',
  args: {
    isJoined: false,
    meeting: { ...mockMeeting, isFavorited: true },
  },
};

export const UnlikedState: Story = {
  name: '찜 안 한 상태',
  args: {
    isJoined: false,
    meeting: { ...mockMeeting, isFavorited: false },
  },
};
