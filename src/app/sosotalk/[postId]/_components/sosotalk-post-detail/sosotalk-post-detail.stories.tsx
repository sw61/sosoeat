'use client';

import { type ComponentProps, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkPostDetail } from './sosotalk-post-detail';

const comments = [
  {
    id: '1',
    authorName: '마민준',
    authorImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop',
    createdAt: '03월 18일 18:42',
    relativeTime: '12분 전',
    content: '혹시 1명 더 신청 가능할까요? 퇴근하고 바로 가면 시간 맞을 것 같아요.',
  },
  {
    id: '2',
    authorName: '김민수',
    authorImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    createdAt: '03월 18일 18:50',
    relativeTime: '방금 전',
    content: '가능해요. 오시기 전에 댓글 한 번만 더 남겨주시면 자리 잡아둘게요.',
    isAuthorComment: true,
  },
];

const meta = {
  title: 'pages/sosotalk/sosotalk-post-detail',
  component: SosoTalkPostDetail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-sosoeat-gray-100 min-h-screen px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto w-full max-w-[1280px] md:max-w-[685px] lg:max-w-[1280px]">
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta<typeof SosoTalkPostDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

function InteractiveDetail(args: ComponentProps<typeof SosoTalkPostDetail>) {
  const [value, setValue] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  return (
    <SosoTalkPostDetail
      {...args}
      isLiked={isLiked}
      likeCount={(args.likeCount ?? 0) + (isLiked ? 1 : 0)}
      onLikeClick={() => setIsLiked((prev) => !prev)}
      onCommentClick={() => undefined}
      onShareClick={() => undefined}
      comments={comments}
      inputValue={value}
      inputPlaceholder="댓글을 입력하세요."
      onChangeInput={setValue}
      onSubmitComment={() => setValue('')}
      currentUserName="마민준"
      currentUserImageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop"
    />
  );
}

export const Default: Story = {
  args: {
    title: '마포 고기집 같이 가실 분?',
    contentHtml:
      '<p>저녁 7시에 마포 고기집에서 <strong>삼겹살</strong> 먹을 분 구합니다. 1인당 2만원 예상됩니다.</p><p><br></p><p><em>편하게 식사하고 이야기 나누실 분</em>이면 좋겠어요. 시간 맞는 분은 댓글로 남겨주세요.</p>',
    imageUrl:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200',
    authorName: '김민수',
    authorImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    likeCount: 24,
    commentCount: 6,
    createdAt: '6시간 전',
    createdAtDateTime: '2026-03-18',
    contentCharacterCount: 75,
    isAuthor: true,
  },
  render: (args) => <InteractiveDetail {...args} />,
};

export const WithoutImage: Story = {
  args: {
    title: '모임 추천 부탁드려요 :D',
    contentHtml:
      '<p>안녕하세요! 요즘 모임을 찾아보고 있는데, 어떤 모임이 좋을지 모르겠어요.</p><p><br></p><p>저는 <strong>자연</strong>, <em>풍경 보는 것</em>을 좋아하고 강아지에도 관심이 많습니다.</p><ul><li>추천 모임</li><li>주의할 점</li></ul><p>자유롭게 댓글 달아주세요.</p>',
    authorName: '윤채림',
    likeCount: 8,
    commentCount: 3,
    createdAt: '2024.01.25',
    createdAtDateTime: '2024-01-25',
    contentCharacterCount: 111,
  },
  render: (args) => <InteractiveDetail {...args} />,
};
