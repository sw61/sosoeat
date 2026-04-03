import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingCommentItem } from './meeting-comment-item';
import type { MeetingComment } from './meeting-comment-section.types';

const mockComment: MeetingComment = {
  id: 1,
  parentId: null,
  author: { nickname: '마민준', profileUrl: null },
  content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요!!',
  isDeleted: false,
  createdAt: '03월 12일',
  likeCount: 3,
  isLiked: false,
  isHostComment: false,
  isMine: false,
};

const meta = {
  title: 'app/meetings/[id]/MeetingCommentItem',
  component: MeetingCommentItem,
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
    comment: mockComment,
    isReply: false,
    meetingId: 1,
  },
} satisfies Meta<typeof MeetingCommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 댓글',
};

export const Liked: Story = {
  name: '좋아요 누른 상태',
  args: {
    comment: { ...mockComment, isLiked: true },
  },
};

export const HostComment: Story = {
  name: '호스트 댓글 (작성자 뱃지)',
  args: {
    comment: { ...mockComment, isHostComment: true },
  },
};

export const MyComment: Story = {
  name: '내 댓글 (수정/삭제 버튼)',
  args: {
    comment: { ...mockComment, isMine: true },
  },
};

export const DeletedComment: Story = {
  name: '삭제된 댓글',
  args: {
    comment: { ...mockComment, isDeleted: true },
  },
};

export const WithProfileImage: Story = {
  name: '프로필 이미지 있음',
  args: {
    comment: {
      ...mockComment,
      author: {
        nickname: '마민준',
        profileUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      },
    },
  },
};

export const Reply: Story = {
  name: '대댓글',
  args: {
    comment: { ...mockComment, parentId: 1 },
    isReply: true,
  },
};

export const WithReplies: Story = {
  name: '대댓글 포함',
  args: {
    comment: {
      ...mockComment,
      replies: [
        { ...mockComment, id: 2, parentId: 1, author: { nickname: '이소소', profileUrl: null } },
        { ...mockComment, id: 3, parentId: 1, isMine: true },
      ],
    },
  },
};
