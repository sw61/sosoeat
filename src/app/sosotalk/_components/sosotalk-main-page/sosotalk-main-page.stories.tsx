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

type AuthSnapshot = Pick<
  ReturnType<typeof useAuthStore.getState>,
  'user' | 'isAuthenticated' | 'isInitialized'
>;

const withAuthState =
  (state: AuthSnapshot): Decorator =>
  (Story) => {
    useAuthStore.setState(state);
    return <Story />;
  };

export const Default: Story = {
  decorators: [
    withAuthState({
      isAuthenticated: true,
      isInitialized: true,
      user: {
        id: '1',
        name: '김민주',
        image: 'https://i.pravatar.cc/80?img=12',
      },
    }),
  ],
};
