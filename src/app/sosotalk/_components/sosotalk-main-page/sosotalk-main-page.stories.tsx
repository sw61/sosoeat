import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';

import { useAuthStore } from '@/store/auth-store';

import { SosoTalkMainPage } from './sosotalk-main-page';

const meta = {
  title: 'pages/sosotalk/sosotalk-main-page',
  component: SosoTalkMainPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SosoTalkMainPage>;

export default meta;

type Story = StoryObj<typeof meta>;

type AuthSnapshot = Pick<ReturnType<typeof useAuthStore.getState>, 'user'>;

const withAuthState =
  (state: AuthSnapshot): Decorator =>
  (Story) => {
    useAuthStore.setState(state);
    return <Story />;
  };

export const Default: Story = {
  decorators: [
    withAuthState({
      user: {
        id: '1',
        name: '김민준',
        profileImage: 'https://i.pravatar.cc/80?img=12',
      },
    }),
  ],
};
