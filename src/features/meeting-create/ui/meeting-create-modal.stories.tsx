import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingCreateForm } from './meeting-create-modal';

const meta: Meta<typeof MeetingCreateForm> = {
  title: './',
  component: MeetingCreateForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'onClose' },
    onSubmit: { action: 'onSubmit' },
  },
};

export default meta;

/**
 * 폼 단독 스토리 (컨테이너 포함)
 */
export const Default: StoryObj<typeof MeetingCreateForm> = {
  decorators: [
    (Story) => (
      <div className="bg-background flex h-auto w-[90vw] overflow-hidden rounded-[24px] border shadow-lg md:h-[472px] md:w-[544px] md:rounded-[40px]">
        <Story />
      </div>
    ),
  ],
  args: {
    onSubmit: async (data) => {
      console.log('Submitted data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onClose: () => {
      console.log('Close clicked');
    },
  },
};
