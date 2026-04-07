import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MyPageCard } from './mypage-card';

const meta: Meta<typeof MyPageCard> = {
  title: 'APP/mypage/mypage-card',
  component: MyPageCard,
  tags: ['autodocs'],
  args: {
    title: '힐링 오피스 스트레칭',
    currentCount: 20,
    maxCount: 20,
    location: '강남구',
    month: 11,
    day: 17,
    hour: 17,
    minute: 30,
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=720',
    variant: 'groupEat',
    confirmedAt: new Date(),
  },
};

export default meta;
type Story = StoryObj<typeof MyPageCard>;

export const GroupEat: Story = {
  name: '함께먹기',
  args: {},
};

export const GroupBuy: Story = {
  name: '공동구매',
  args: {
    variant: 'groupBuy',
  },
};

export const Unconfirmed: Story = {
  name: '개설대기',
  args: {
    confirmedAt: null,
  },
};

export const Completed1: Story = {
  name: '이용예정',
  args: {
    isCompleted: false,
  },
};

export const Completed2: Story = {
  name: '이용완료',
  args: {
    variant: 'groupBuy',
    isCompleted: true,
  },
};
