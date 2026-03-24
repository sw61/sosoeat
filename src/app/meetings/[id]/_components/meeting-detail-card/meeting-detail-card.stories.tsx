import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Meeting } from '@/types/meeting';

import { MeetingDetailCard } from './meeting-detail-card';

const mockMeeting: Meeting = {
  id: '1',
  name: '강남 맛집 탐방 함께해요! 분위기 좋은 이탈리안 레스토랑',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울 강남구 테헤란로 123 1층',
  latitude: 37.5065,
  longitude: 127.0536,
  dateTime: '2024/03/15(금) 18:30',
  registrationEnd: '2024/03/14T23:59:59.000Z',
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
  args: {
    meeting: mockMeeting,
    role: 'participant',
    status: 'open',
    isJoined: false,
    isLiked: false,
  },
} satisfies Meta<typeof MeetingDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 모바일 (접힘/펼침) ────────────────────────────────

export const MobileDefault: Story = {
  name: '모바일 — 기본 (접힘)',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
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
    status: 'closed',
  },
};

export const GroupBuyCategory: Story = {
  name: '공동구매 카테고리',
  args: {
    meeting: { ...mockMeeting, type: 'groupBuy' },
    role: 'participant',
  },
};

export const LikedState: Story = {
  name: '찜한 상태',
  args: {
    isLiked: true,
  },
};

export const UnlikedState: Story = {
  name: '찜 안 한 상태',
  args: {
    isLiked: false,
  },
};

export const FullParticipants: Story = {
  name: '참여 인원 가득 (100%)',
  args: {
    meeting: { ...mockMeeting, participantCount: 6, capacity: 6 },
    status: 'full',
  },
};
