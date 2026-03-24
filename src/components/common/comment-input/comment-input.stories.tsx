'use client';

import { type ComponentProps, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CommentInput } from './comment-input';

const meta = {
  title: 'components/common/comment-input',
  component: CommentInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-full max-w-[760px] bg-white p-3 sm:p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: '댓글을 입력하세요.',
    currentUserName: '마민준',
    currentUserImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop',
  },
} satisfies Meta<typeof CommentInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function InteractiveCommentInput(args: ComponentProps<typeof CommentInput>) {
  const [value, setValue] = useState(
    '글자가 늘어난다면 아래로 현재 입력 박스와 같이 확장됩니다.'
  );

  return <CommentInput {...args} value={value} onChange={setValue} onSubmit={() => undefined} />;
}

export const Default: Story = {
  render: args => <InteractiveCommentInput {...args} />,
};
