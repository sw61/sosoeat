import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Meeting } from '@/types/meeting';

import { MeetingDetailCard } from './meeting-detail-card';
import type { MeetingRole, MeetingStatus } from './meeting-detail-card.types';

// Storybook은 discriminated union을 args composition에 사용할 수 없으므로
// 스토리 전용 평탄화 타입을 정의합니다.
// 컴포넌트 자체의 ISP(discriminated union)는 그대로 유지됩니다.
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
  id: '1',
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
  createdBy: '1',
  updatedAt: '2024/03/01T00:00:00.000Z',
  host: {
    id: 1,
    name: '김소소',
  },
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
  // isJoined는 participant 전용이므로 meta.args에서 제거하고
  // 각 participant 스토리에서 명시적으로 지정합니다.
  args: {
    meeting: mockMeeting,
    role: 'participant',
    status: 'open',
  },
} as Meta<typeof MeetingDetailCard>;

export default meta;
type Story = StoryObj<StoryArgs>;

// ── 모바일 (접힘/펼침) ────────────────────────────────

export const MobileDefault: Story = {
  name: '모바일 — 기본 (접힘)',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    isJoined: false,
  },
};

export const MobileHost: Story = {
  name: '모바일 — Host (... 드롭다운)',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    role: 'host',
    status: 'open',
  },
};

export const MobileClosedMeeting: Story = {
  name: '모바일 — 마감된 모임',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    isJoined: false,
    status: 'closed',
  },
};

// ── 데스크탑 (항상 펼침) ─────────────────────────────

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

export const ClosedMeeting: Story = {
  name: '마감된 모임',
  args: {
    isJoined: false,
    status: 'closed',
  },
};

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

export const FullParticipants: Story = {
  name: '참여 인원 가득 (100%)',
  args: {
    meeting: { ...mockMeeting, participantCount: 6, capacity: 6 },
    isJoined: false,
    status: 'full',
  },
};
