import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';

import { useAuthStore } from '@/shared/store/auth-store';

import { NavigationBar } from './navigation-bar';

const meta: Meta<typeof NavigationBar> = {
  title: 'components/common/navigation-bar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

type AuthSnapshot = Pick<ReturnType<typeof useAuthStore.getState>, 'user'>;

const withAuthState =
  (state: AuthSnapshot): Decorator =>
  (Story) => {
    useAuthStore.setState(state);
    return <Story />;
  };

const MOCK_USER = { id: 1, name: '홍길동', email: 'test@example.com', teamId: 'dallaem' };

export const NotLoggedIn: Story = {
  name: '비로그인',
  decorators: [withAuthState({ user: null })],
};

export const NotLoggedInActiveMenu: Story = {
  name: '비로그인 / 활성메뉴',
  decorators: [withAuthState({ user: null })],
  parameters: {
    nextjs: { navigation: { pathname: '/meetings' } },
  },
};

export const NotLoggedInWishList: Story = {
  name: '비로그인 / 찜한 모임 클릭 → 로그인 이동',
  decorators: [withAuthState({ user: null })],
  parameters: {
    nextjs: { navigation: { pathname: '/mypage?tab=liked' } },
  },
};

export const LoggedIn: Story = {
  name: '로그인',
  decorators: [withAuthState({ user: MOCK_USER })],
};

export const LoggedInActiveMenu: Story = {
  name: '로그인 / 활성메뉴',
  decorators: [withAuthState({ user: MOCK_USER })],
  parameters: {
    nextjs: { navigation: { pathname: '/meetings' } },
  },
};

export const LoggedInWithProfileImage: Story = {
  name: '로그인 / 프로필이미지',
  decorators: [
    withAuthState({
      user: {
        id: 1,
        name: '김철수',
        email: 'test@example.com',
        image: 'https://i.pravatar.cc/32?img=47',
        teamId: 'dallaem',
      },
    }),
  ],
};
