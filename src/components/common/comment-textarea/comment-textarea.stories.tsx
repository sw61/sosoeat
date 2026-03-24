import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CommentTextarea } from './comment-textarea';

const meta: Meta<typeof CommentTextarea> = {
  title: 'COMPONENTS/common/comment-textarea',
  component: CommentTextarea,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CommentTextarea>;

// 기본 상태
export const Default: Story = {
  args: {
    placeholder: '댓글을 입력하세요.',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    placeholder: '댓글을 남길 수 없습니다.',
    disabled: true,
  },
};
