'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkPostDetailPage } from './sosotalk-post-detail-page';

const meta = {
  title: 'pages/sosotalk/sosotalk-post-detail-page',
  component: SosoTalkPostDetailPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SosoTalkPostDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
