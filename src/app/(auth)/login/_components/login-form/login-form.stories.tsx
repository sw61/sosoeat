import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LoginLayout } from '../login-layout/login-layout';

import { LoginForm } from './login-form';

const queryClient = new QueryClient();

const meta = {
  title: 'pages/auth/login/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <LoginLayout>
          <Story />
        </LoginLayout>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '로그인 페이지 레이아웃',
};
