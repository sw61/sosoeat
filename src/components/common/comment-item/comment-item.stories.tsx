import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CommentItem } from './comment-item';

const meta = {
  title: 'components/common/comment-item',
  component: CommentItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-full max-w-[1280px] bg-white p-3 sm:p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    authorName: '마민준',
    authorImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop',
    createdAt: '03월 12일 14:32',
    relativeTime: '5분 전',
    content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요!!',
  },
} satisfies Meta<typeof CommentItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AuthorComment: Story = {
  args: {
    isAuthorComment: true,
  },
};
