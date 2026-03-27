import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkPostDetail } from './sosotalk-post-detail';

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

export const Default: Story = {
  args: {
    categoryLabel: '함께 먹기',
    statusLabel: '모집중',
    title: '마포 고기집 같이 가실 분!',
    content:
      '저녁 7시에 마포 고기집에서 삼겹살 먹을 분 구합니다. 1인당 2만원 예상됩니다.\n\n편하게 식사하고 이야기 나누실 분이면 좋겠어요. 시간 맞는 분은 댓글로 남겨주세요.',
    imageUrl:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200',
    authorName: '김민수',
    authorImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    likeCount: 24,
    commentCount: 6,
    createdAt: '6일 전',
    createdAtDateTime: '2026-03-18',
    contentCharacterCount: 75,
    isAuthor: true,
  },
};

export const WithoutImage: Story = {
  args: {
    categoryLabel: '소소토크',
    title: '모임 추천 부탁드립니다 :D',
    content:
      '안녕하세요! 요즘 모임을 찾아보고 있는데, 어떤 모임이 좋을지 모르겠어요.\n\n저는 자연, 풍경 보는 걸 좋아하고 강아지에도 관심이 많습니다!\n혹시 해보신 모임 중에서 괜찮았던 모임이나 주의할 점 있으면 자유롭게 댓글 달아주세요.',
    authorName: '럽윈즈',
    likeCount: 8,
    commentCount: 3,
    createdAt: '2024.01.25',
    createdAtDateTime: '2024-01-25',
    contentCharacterCount: 111,
  },
};
