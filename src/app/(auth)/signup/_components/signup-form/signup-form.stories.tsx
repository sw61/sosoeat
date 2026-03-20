import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SignupForm } from './signup-form';

const queryClient = new QueryClient();

const meta: Meta<typeof SignupForm> = {
  title: 'Auth/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light-gray',
      values: [{ name: 'light-gray', value: '#F3F4F6' }], // gray-100 느낌의 실제 페이지 배경
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        {/* 모바일 화면 크기에 가까운 패딩과 환경 구성 */}
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {
  args: {
    onSubmit: async (data) => {
      console.log('Submitted data:', data);
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
    defaultStep: 'nickname',
  },
};

export const PasswordStep: Story = {
  args: {
    ...Default.args,
    defaultStep: 'password',
  },
};

export const NicknameStep: Story = {
  args: {
    ...Default.args,
    defaultStep: 'nickname',
  },
};
