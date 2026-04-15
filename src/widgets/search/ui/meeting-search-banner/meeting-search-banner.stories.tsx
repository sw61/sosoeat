import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingSearchBanner } from './meeting-search-banner';

const BANNER_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80';

const defaultSubtitleText =
  '가고 싶었던 맛집, 혼자 가기 아쉬웠죠? 모여요에서 같이 먹을 사람을 찾아보세요.';

const meta = {
  title: 'app/meetings/meeting-search-banner',
  component: MeetingSearchBanner,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/meetings/1',
      },
    },
  },
  args: {
    imageUrl: BANNER_IMAGE,
    alt: '모임 찾기 상세 배너',
    titleContent: '함께하면',
    subtitleContent: '더 맛있어요',
    subtitle: <p>{defaultSubtitleText}</p>,
  },
  argTypes: {
    imageUrl: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
    titleContent: { control: 'text' },
    subtitleContent: { control: 'text' },
    subtitle: { control: false },
  },
} satisfies Meta<typeof MeetingSearchBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
};

export const CustomCopy: Story = {
  name: '커스텀 문구',
  args: {
    titleContent: '이번 주말,',
    subtitleContent: '함께 식사해요',
    subtitle: <p>새로운 사람들과 맛집을 나눠 보세요.</p>,
  },
};
