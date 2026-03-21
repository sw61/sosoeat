import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CountingBadge } from './counting-badge';

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
  title: 'components/common/counting-badge',
  component: CountingBadge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CountingBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 (0개)',
  decorators: [withQueryData(0)],
};

export const WithCount: Story = {
  name: '카운트 있음',
  decorators: [withQueryData(5)],
};

export const MaxCount: Story = {
  name: '최대 표시 (99)',
  decorators: [withQueryData(99)],
};

export const OverMaxCount: Story = {
  name: '99 초과 (99+)',
  decorators: [withQueryData(100)],
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
