import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LoginLayout } from '../login-layout/login-layout';

import { LoginForm } from './login-form';

const meta = {
  title: 'pages/auth/login/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <LoginLayout>
        <Story />
      </LoginLayout>
    ),
  ],
  args: {
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '로그인 페이지 레이아웃',
};

export const Loading: Story = {
  name: '로그인 중 (Loading)',
  args: {
    isLoading: true,
  },
};
