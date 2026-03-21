import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MeetingDetailBanner from './meeting-detail-banner';

const BANNER_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80';

/** 모바일(≤375): left 93 · 데스크톱: left 104 — 피그마 Banner_모임찾기 / 함께하면 더 맛있어요 */
const titleHeadingClass =
  'absolute top-[39px] left-[93px] max-w-[217px] font-sans text-[46px] leading-[55px] font-extrabold tracking-[-1.38px] text-white min-[376px]:left-[104px]';

const subtitleClass =
  'absolute top-[158px] left-[104px] max-w-[330px] text-base leading-[28px] font-normal text-[rgba(255,255,255,0.78)]';

const defaultSubtitleText =
  '가고 싶었던 맛집, 혼자 가기 아쉬웠죠? 모여요에서 같이 먹을 사람을 찾아보세요.';

const defaultTitleContent = (
  <h2 className={titleHeadingClass}>
    함께하면 <span className="text-sosoeat-orange-500">더 맛있어요</span>
  </h2>
);

const defaultSubtitle = (
  <p
    className={subtitleClass}
    style={{
      fontFamily: "'Noto Sans KR', var(--font-pretendard-local), sans-serif",
    }}
  >
    {defaultSubtitleText}
  </p>
);

const meta = {
  title: 'app/meetings/meeting-detail-banner',
  component: MeetingDetailBanner,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/meetings/1',
      },
    },
  },
  args: {
    imageUrl: BANNER_IMAGE,
    alt: '모임 찾기 상세 배너',
    titleContent: defaultTitleContent,
    subtitle: defaultSubtitle,
  },
  argTypes: {
    imageUrl: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
    titleContent: { control: false },
    subtitle: { control: false },
  },
} satisfies Meta<typeof MeetingDetailBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본',
};

export const CustomCopy: Story = {
  name: '커스텀 문구',
  args: {
    titleContent: (
      <h2 className={titleHeadingClass}>
        이번 주말, <span className="text-sosoeat-orange-400">함께 식사해요</span>
      </h2>
    ),
    subtitle: (
      <p
        className={subtitleClass}
        style={{
          fontFamily: "'Noto Sans KR', var(--font-pretendard-local), sans-serif",
        }}
      >
        새로운 사람들과 맛집을 나눠 보세요.
      </p>
    ),
  },
};
