import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { EditProfileModal } from './edit-profile-modal';

const meta: Meta<typeof EditProfileModal> = {
  title: 'APP/mypage/edit-profile-modal',
  component: EditProfileModal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EditProfileModal>;

// default
export const Default: Story = {
  name: '반응형',
  args: {
    initialName: '김민준',
    initialEmail: 'sosoeat@codeit.com',
  },
};
