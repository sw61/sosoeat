import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LikedMeetingBadge } from './liked-meeting-badge';

const withQueryData =
  (count: number): Decorator =>
  (Story) => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(['likedMeetingCount'], count);
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  };

const meta = {
  title: 'components/common/navigation-bar/liked-meeting-badge',
  component: LikedMeetingBadge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LikedMeetingBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 (0개)',
  decorators: [withQueryData(0)],
};

export const WithCount: Story = {
  name: '찜한 모임 있음',
  decorators: [withQueryData(5)],
};

export const LargeCount: Story = {
  name: '많은 수량',
  decorators: [withQueryData(99)],
};

export const Loading: Story = {
  name: '로딩 중 (배지 숨김)',
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: Infinity } },
      });
      // 데이터를 세팅하지 않고 fetch를 영원히 대기시켜 로딩 상태를 유지
      global.fetch = () => new Promise(() => {});
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};
