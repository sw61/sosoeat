import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Meeting } from '@/types/meeting';

import RecommendedMeetingCard from './meeting-recommended-card';

const mockMeeting: Meeting = {
  id: 1,
  name: '강남 맛집 탐방 함께해요!',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울 강남구 테헤란로 123',
  latitude: 37.5065,
  longitude: 127.0536,
  dateTime: '2024-03-15T09:30:00.000Z',
  registrationEnd: '2027-03-14T23:59:59.000Z',
  participantCount: 3,
  capacity: 6,
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
  description: '',
  hostId: 1,
  teamId: 'test-team',
  createdBy: 1,
  updatedAt: '2024-03-01T00:00:00.000Z',
  host: { id: 1, name: '김소소' },
  isFavorited: false,
};

const meta = {
  title: 'app/meetings/[id]/RecommendedMeetingCard',
  component: RecommendedMeetingCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    meeting: mockMeeting,
  },
} satisfies Meta<typeof RecommendedMeetingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
};

export const Liked: Story = {
  name: '찜한 상태',
  args: {
    meeting: { ...mockMeeting, isFavorited: true },
  },
};

export const GroupBuy: Story = {
  name: '공동구매',
  args: {
    meeting: { ...mockMeeting, type: 'groupBuy' },
  },
};
