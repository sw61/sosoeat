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

const manyMockComments: MeetingComment[] = [
  ...mockComments,
  {
    id: 3,
    parentId: null,
    author: { nickname: '김모임', profileUrl: null },
    content: '저도 신청했어요! 기대됩니다 :)',
    isDeleted: false,
    createdAt: '03월 14일',
    likeCount: 0,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 4,
    parentId: null,
    author: { nickname: '박소소', profileUrl: null },
    content: '혹시 주차 가능한가요?',
    isDeleted: false,
    createdAt: '03월 14일',
    likeCount: 2,
    isLiked: true,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 5,
    parentId: null,
    author: { nickname: '최잇다', profileUrl: null },
    content: '드레스코드 있나요?',
    isDeleted: false,
    createdAt: '03월 15일',
    likeCount: 0,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 6,
    parentId: null,
    author: { nickname: '정소잇', profileUrl: null },
    content: '인원 마감 임박인데 빨리 신청해야겠어요!',
    isDeleted: false,
    createdAt: '03월 15일',
    likeCount: 1,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 7,
    parentId: null,
    author: { nickname: '한소소', profileUrl: null },
    content: '지난번에도 참여했었는데 정말 좋았어요. 이번에도 기대됩니다!',
    isDeleted: false,
    createdAt: '03월 16일',
    likeCount: 5,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 8,
    parentId: null,
    author: { nickname: '오소소', profileUrl: null },
    content: '메뉴가 미리 정해져 있나요? 아니면 당일에 결정하나요?',
    isDeleted: false,
    createdAt: '03월 16일',
    likeCount: 0,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 9,
    parentId: null,
    author: { nickname: '윤소잇', profileUrl: null },
    content: '처음 참여하는데 혼자 가도 어색하지 않을까요? 걱정이 되네요.',
    isDeleted: false,
    createdAt: '03월 17일',
    likeCount: 2,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 10,
    parentId: null,
    author: { nickname: '임소소', profileUrl: null },
    content: '모임 후기 어디서 볼 수 있나요?',
    isDeleted: false,
    createdAt: '03월 17일',
    likeCount: 0,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 11,
    parentId: null,
    author: { nickname: '강모임', profileUrl: null },
    content: '참여 확정 문자는 언제쯤 오나요?',
    isDeleted: false,
    createdAt: '03월 18일',
    likeCount: 1,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 12,
    parentId: null,
    author: { nickname: '신소잇', profileUrl: null },
    content: '당일 취소도 가능한가요?',
    isDeleted: false,
    createdAt: '03월 18일',
    likeCount: 0,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 13,
    parentId: null,
    author: { nickname: '류소소', profileUrl: null },
    content: '음료는 포함인가요?',
    isDeleted: false,
    createdAt: '03월 19일',
    likeCount: 0,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 14,
    parentId: null,
    author: { nickname: '백소잇', profileUrl: null },
    content: '장소가 지하철역에서 가깝나요?',
    isDeleted: false,
    createdAt: '03월 19일',
    likeCount: 2,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 15,
    parentId: null,
    author: { nickname: '조모임', profileUrl: null },
    content: '혹시 연령대 제한 있나요? 20대도 괜찮을까요?',
    isDeleted: false,
    createdAt: '03월 20일',
    likeCount: 3,
    isLiked: true,
    isHostComment: false,
    isMine: false,
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

export const WithScroll: Story = {
  name: '스크롤 (댓글 6개 이상)',
  args: {
    comments: manyMockComments,
    commentCount: manyMockComments.length,
  },
  decorators: [withAuthState({ user: MOCK_USER, isAuthenticated: true })],
};

export const Empty: Story = {
  name: '댓글 없음',
  args: {
    comments: [],
    commentCount: 0,
  },
  decorators: [withAuthState({ user: MOCK_USER, isAuthenticated: true })],
};
