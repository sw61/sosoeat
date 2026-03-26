import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SosoTalkWritePage from './page';

const meta = {
  title: 'pages/sosotalk/write/page',
  component: SosoTalkWritePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'lightGray',
      values: [{ name: 'lightGray', value: '#F6F7FB' }],
    },
  },
} satisfies Meta<typeof SosoTalkWritePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
