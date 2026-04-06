import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SignupForm } from './signup-form';

const queryClient = new QueryClient();

const meta: Meta<typeof SignupForm> = {
  title: 'pages/auth/signup/signupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light-gray',
      values: [{ name: 'light-gray', value: '#F9F9F9' }],
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="bg-sosoeat-gray-100 flex h-screen w-screen items-center justify-center">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const EmailStep: Story = {
  args: { defaultStep: 'email' },
};

export const PasswordStep: Story = {
  args: { defaultStep: 'password' },
};

export const NicknameStep: Story = {
  args: { defaultStep: 'name' },
};
