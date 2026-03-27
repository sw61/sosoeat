import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SignupForm } from './signup-form';

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
      <div className="bg-sosoeat-gray-100 flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const EmailStep: Story = {
  args: {
    onSubmit: async (data) => {
      console.log('Submitted data:', data);
    },
    defaultStep: 'email',
  },
};

export const Loading: Story = {
  args: {
    ...EmailStep.args,
    isLoading: true,
    defaultStep: 'name',
  },
};

export const PasswordStep: Story = {
  args: {
    ...EmailStep.args,
    defaultStep: 'password',
  },
};

export const NicknameStep: Story = {
  args: {
    ...EmailStep.args,
    defaultStep: 'name',
  },
};
