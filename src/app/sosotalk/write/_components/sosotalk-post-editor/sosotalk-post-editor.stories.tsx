import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SosoTalkPostEditor } from './sosotalk-post-editor';

const meta = {
  title: 'pages/sosotalk/write/sosotalk-post-editor',
  component: SosoTalkPostEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'lightGray',
      values: [{ name: 'lightGray', value: '#F6F7FB' }],
    },
  },
} satisfies Meta<typeof SosoTalkPostEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialTitle: '',
    initialContent: '',
  },
};

export const WithImagePreview: Story = {
  args: {
    initialTitle: '모임 추천 부탁드립니다 :D',
    initialContent:
      '안녕하세요! 요즘 모임을 찾아보고 있는데, 어떤 모임이 좋을지 모르겠어요.\n\n저는 자연, 풍경 보는 걸 좋아하고 강아지에 관심이 많습니다!\n혹시 해보신 모임 중에서 괜찮았던 모임이나 주의할 점 있으면 자유롭게 댓글 달아주세요.',
    initialImageUrl:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop',
  },
};
