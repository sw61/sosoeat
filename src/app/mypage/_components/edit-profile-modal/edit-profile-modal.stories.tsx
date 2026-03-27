import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { EditProfileModal } from './edit-profile-modal';

const meta: Meta<typeof EditProfileModal> = {
  title: 'app/mypage/edit-profile-modal',
  component: EditProfileModal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof EditProfileModal>;

export const Default: Story = {
  name: '기본',
};

export const WithUserData: Story = {
  name: '사용자 데이터',
  args: {
    initialName: '럽윈즈올',
    initialEmail: 'lovewins@codeit.com',
    onSubmit: (name, email) => alert(`수정 완료: ${name}, ${email}`),
  },
};

export const Closed: Story = {
  name: '닫힘 상태',
  args: {
    isOpen: false,
  },
};
