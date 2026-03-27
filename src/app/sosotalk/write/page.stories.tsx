'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useAuthStore } from '@/store/auth-store';

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

export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({ user: null });

      return <Story />;
    },
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        user: {
          id: '1',
          name: '김민준',
          profileImage:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
        },
      });

      return <Story />;
    },
  ],
};
