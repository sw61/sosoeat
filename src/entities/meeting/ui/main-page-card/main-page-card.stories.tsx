import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { addDays, addMonths } from 'date-fns';

import type { Meeting } from '../../model/meeting.types';

import { MainPageCard } from './main-page-card';

const meta = {
  title: 'entities/meeting/ui/MainPageCard',
  component: MainPageCard,
} satisfies Meta<typeof MainPageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = new Date();
const meetingDate = addDays(addMonths(now, 1), 5);
meetingDate.setHours(18, 30, 0, 0);
const registrationEndDate = addDays(addMonths(now, 1), 4);
registrationEndDate.setHours(12, 0, 0, 0);

const MOCK_MEETING: Meeting = {
  id: 1,
  teamId: 'storybook',
  name: '강남역에서 점심 같이 먹어요',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울특별시 강남구 테헤란로',
  latitude: 37.498,
  longitude: 127.028,
  dateTime: meetingDate.toISOString(),
  registrationEnd: registrationEndDate.toISOString(),
  capacity: 6,
  participantCount: 3,
  image:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=720',
  description: '',
  canceledAt: null,
  confirmedAt: null,
  hostId: 1,
  updatedAt: new Date('2025-03-21T00:00:00').toISOString(),
  host: {
    id: 1,
    name: '김소소',
    image: 'https://i.pravatar.cc/32?img=47',
  },
};

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
      confirmedAt: '2025-03-22T12:00:00.000Z',
    },
  },
};

export const EstablishedGroupBuy: Story = {
  args: {
    meeting: {
      ...MOCK_MEETING,
      type: 'groupBuy',
      confirmedAt: '2025-03-22T12:00:00.000Z',
    },
  },
};
