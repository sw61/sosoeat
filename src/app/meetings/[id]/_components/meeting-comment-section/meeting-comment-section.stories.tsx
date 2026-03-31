import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';

import { useAuthStore } from '@/store/auth-store';

import { MeetingCommentSection } from './meeting-comment-section';
import type { MeetingComment } from './meeting-comment-section.types';

const mockComments: MeetingComment[] = [
  {
    id: 1,
    parentId: null,
    author: { nickname: '마민준', profileUrl: null },
    content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요!!',
    isDeleted: false,
    createdAt: '03월 12일',
    likeCount: 3,
    isLiked: false,
    isHostComment: true,
    isMine: false,
  },
  {
    id: 2,
    parentId: null,
    author: { nickname: '이소소', profileUrl: null },
    content: '저도 참여하고 싶어요! 초보자도 괜찮을까요?',
    isDeleted: false,
    createdAt: '03월 13일',
    likeCount: 1,
    isLiked: false,
    isHostComment: false,
    isMine: true,
  },
];

type AuthSnapshot = Pick<ReturnType<typeof useAuthStore.getState>, 'user' | 'isAuthenticated'>;

const withAuthState =
  (state: AuthSnapshot): Decorator =>
  (Story) => {
    useAuthStore.setState(state);
    return <Story />;
  };

const MOCK_USER = { id: 1, name: '홍길동', email: 'test@example.com' };

const meta = {
  title: 'app/meetings/[id]/MeetingCommentSection',
  component: MeetingCommentSection,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
  args: {
    comments: mockComments,
    commentCount: mockComments.length,
  },
} satisfies Meta<typeof MeetingCommentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedIn: Story = {
  name: '비로그인 (입력창 비활성화)',
  decorators: [withAuthState({ user: null, isAuthenticated: false })],
};

export const LoggedIn: Story = {
  name: '로그인 (입력창 활성화)',
  decorators: [withAuthState({ user: MOCK_USER, isAuthenticated: true })],
};

export const LoggedInWithProfileImage: Story = {
  name: '로그인 / 프로필 이미지',
  decorators: [
    withAuthState({
      user: {
        ...MOCK_USER,
        image: 'https://i.pravatar.cc/54?img=47',
      },
      isAuthenticated: true,
    }),
  ],
};

export const Empty: Story = {
  name: '댓글 없음',
  args: {
    comments: [],
    commentCount: 0,
  },
  decorators: [withAuthState({ user: MOCK_USER, isAuthenticated: true })],
};
