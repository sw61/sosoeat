import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';

import { useAuthStore } from '@/store/authStore';

import { NavigationBar } from './navigation-bar';

const meta: Meta<typeof NavigationBar> = {
  title: 'Common/NavigationBar',
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

const MOCK_USER = { id: '1', name: '홍길동' };

// ── 비로그인 ──────────────────────────────────────────

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

export const NotLoggedInMobile: Story = {
  name: '비로그인 / 모바일',
  decorators: [withAuthState({ user: null })],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

// ── 로그인 ────────────────────────────────────────────

export const LoggedIn: Story = {
  name: '로그인',
  decorators: [withAuthState({ user: MOCK_USER })],
};

export const LoggedInActiveMenu: Story = {
  name: '로그인 / 활성메뉴',
  decorators: [withAuthState({ user: MOCK_USER })],
  parameters: {
    nextjs: { navigation: { pathname: '/wishlist' } },
  },
};

export const LoggedInWithProfileImage: Story = {
  name: '로그인 / 프로필이미지',
  decorators: [
    withAuthState({
      user: { id: '2', name: '김소소', profileImage: 'https://i.pravatar.cc/32?img=47' },
    }),
  ],
};

export const LoggedInMobile: Story = {
  name: '로그인 / 모바일',
  decorators: [withAuthState({ user: MOCK_USER })],
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

// TODO: 아래 스토리는 React Query 연결 후 추가 예정
// - 알림 읽음/읽지 않음 (unreadCount)
// - 찜한 모임 배지 표시 (wishlistCount)
