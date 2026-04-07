import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { addDays, addMonths } from 'date-fns';

import type { MeetingWithHost } from '@/shared/types/generated-client';

import { MainPageCard } from './main-page-card';

const meta = {
  title: './',
  component: MainPageCard,
} satisfies Meta<typeof MainPageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = new Date();
const meetingDate = addDays(addMonths(now, 1), 5);
meetingDate.setHours(18, 30, 0, 0);
const registrationEndDate = addDays(addMonths(now, 1), 4);
registrationEndDate.setHours(12, 0, 0, 0);

const createdAt = new Date('2025-03-22T00:00:00');
const updatedAt = new Date('2025-03-21T00:00:00');

/** `confirmedAt: null`은 DTO 타입과 다르지만 `EstablishmentStatusBadge` 동작과 맞춤 */
const MOCK_MEETING = {
  id: 1,
  teamId: 'storybook',
  name: '강남역에서 점심 같이 먹어요',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울특별시 강남구 테헤란로',
  latitude: 37.498,
  longitude: 127.028,
  dateTime: meetingDate,
  registrationEnd: registrationEndDate,
  capacity: 6,
  participantCount: 3,
  image:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=720',
  description: '',
  canceledAt: createdAt,
  confirmedAt: null,
  hostId: 1,
  createdBy: 1,
  createdAt,
  updatedAt,
  host: {
    id: 1,
    name: '김소소',
    image: 'https://i.pravatar.cc/32?img=47',
  },
} as unknown as MeetingWithHost;

export const Default: Story = {
  args: { meeting: MOCK_MEETING },
};

export const GroupBuy: Story = {
  args: {
    meeting: {
      ...MOCK_MEETING,
      type: 'groupBuy',
      name: '이마트 택배 같이 받을 분 구해요',
      region: '서울 건대입구',
    },
  },
};

export const AlmostFull: Story = {
  args: {
    meeting: {
      ...MOCK_MEETING,
      participantCount: 5,
      capacity: 6,
      name: '마감 임박! 6명 중 5명 모집 완료',
    },
  },
};

export const EstablishedGroupEat: Story = {
  args: {
    meeting: {
      ...MOCK_MEETING,
      confirmedAt: new Date('2025-03-22T12:00:00'),
    },
  },
};

export const EstablishedGroupBuy: Story = {
  args: {
    meeting: {
      ...MOCK_MEETING,
      type: 'groupBuy',
      confirmedAt: new Date('2025-03-22T12:00:00'),
    },
  },
};
