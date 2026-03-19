import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { addDays, addMonths, format } from 'date-fns';

import { MainPageCard } from '@/components/common/main-page-card/main-page-card';
import type { Meeting } from '@/components/common/main-page-card/main-page-card.type';

const meta = {
  title: 'components/common/main-page-card',
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
  name: '강남역에서 점심 같이 먹어요',
  type: 'groupEat',
  variant: 'groupEat',
  region: '서울 강남구',
  dateTime: format(meetingDate, "yyyy-MM-dd'T'HH:mm:ss"),
  registrationEnd: format(registrationEndDate, "yyyy-MM-dd'T'HH:mm:ss"),
  capacity: 6,
  participantCount: 3,
  image:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=720',
  canceledAt: null,
  confirmedAt: null,
  hostId: 1,
  createdBy: 1,
  createdAt: '2025-03-22T00:00:00',
  updatedAt: '2025-03-21T00:00:00',
  host: {
    id: 1,
    name: '김소소',
    image: 'https://i.pravatar.cc/32?img=47',
  },
};

export const Default: Story = {
  args: MOCK_MEETING,
};

export const GroupBuy: Story = {
  args: {
    ...MOCK_MEETING,
    type: '공동구매_그룹',
    variant: 'groupBuy',
    name: '이마트 택배 같이 받을 분 구해요',
    region: '서울 건대입구',
  },
};

export const AlmostFull: Story = {
  args: {
    ...MOCK_MEETING,
    participantCount: 5,
    capacity: 6,
    name: '마감 임박! 6명 중 5명 모집 완료',
  },
};
