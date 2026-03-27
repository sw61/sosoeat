import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkBanner } from './sosotalk-banner';

const meta = {
  title: 'pages/sosotalk/sosotalk-banner',
  component: SosoTalkBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof SosoTalkBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
    alt: '소소토크 배너 이미지',
  },
};
