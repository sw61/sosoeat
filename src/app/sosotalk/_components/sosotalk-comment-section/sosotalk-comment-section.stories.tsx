'use client';

import { type ComponentProps, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkCommentSection } from './sosotalk-comment-section';

const comments = [
  {
    id: '1',
    authorName: '마민준',
    authorImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop',
    createdAt: '03월 12일 14:32',
    relativeTime: '5분 전',
    content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요.',
  },
  {
    id: '2',
    authorName: '김민수',
    authorImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    createdAt: '03월 12일 14:38',
    relativeTime: '방금 전',
    content: '물론이죠. 편하게 오셔도 됩니다. 같이 맛있게 먹어요!',
    isAuthorComment: true,
  },
  {
    id: '3',
    authorName: '이수연',
    authorImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    createdAt: '03월 12일 14:40',
    relativeTime: '1분 전',
    content: '저도 관심 있어요. 혹시 정확한 장소 공유 가능할까요?',
  },
];

const meta = {
  title: 'pages/sosotalk/sosotalk-comment-section',
  component: SosoTalkCommentSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-sosoeat-gray-100 w-full px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <Story />
        </div>
      </div>
    ),
  ],
  args: {
    comments,
    commentCount: 3,
    inputPlaceholder: '댓글을 입력하세요.',
    currentUserName: '마민준',
    currentUserImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop',
  },
} satisfies Meta<typeof SosoTalkCommentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

function InteractiveSection(args: ComponentProps<typeof SosoTalkCommentSection>) {
  const [value, setValue] = useState(
    '글자가 늘어나면 입력창 높이도 자연스럽게 함께 늘어나는지 확인할 수 있어요.'
  );

  return (
    <SosoTalkCommentSection
      {...args}
      inputValue={value}
      onChangeInput={setValue}
      onSubmitComment={() => undefined}
    />
  );
}

export const Default: Story = {
  render: (args) => <InteractiveSection {...args} />,
};
