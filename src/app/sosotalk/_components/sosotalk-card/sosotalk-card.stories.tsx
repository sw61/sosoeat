import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkCard } from './sosotalk-card';

const meta = {
  title: 'SosoTalk/SosoTalkCard',
  component: SosoTalkCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SosoTalkCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '유기농 채소 주기적으로 공구 하실 분!',
    content: '유기농 채소 주기적으로 공구 하실 분들을 찾습니다.',
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
    authorName: '홍길동',
    authorImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    likeCount: 12,
    commentCount: 3,
    createdAt: '2026.03.18',
  },
};
