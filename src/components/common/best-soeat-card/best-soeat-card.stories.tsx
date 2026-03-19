import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BestSoeatCard } from './best-soeat-card';

const meta = {
  title: 'components/common/best-soeat-card',
  component: BestSoeatCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: '강남 고기집 같이 가실 분!',
    region: '서울 강남구',
    meetingAt: '3/15(일) 18:30',
  },
} satisfies Meta<typeof BestSoeatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 (썸네일 없음)',
};

export const WithThumbnail: Story = {
  name: '썸네일 있음',
  args: {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    thumbnailAlt: '맛있는 음식',
  },
};

export const WithClick: Story = {
  name: '클릭 가능',
  args: {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
    onClick: () => alert('카드 클릭!'),
  },
};

export const LongTitle: Story = {
  name: '긴 제목 (line-clamp-2)',
  args: {
    title: '주말 저녁 분위기 좋은 이탈리안 레스토랑에서 파스타 같이 드실 분 모집합니다!',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=400',
  },
};
