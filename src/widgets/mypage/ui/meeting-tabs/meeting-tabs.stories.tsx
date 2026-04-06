import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingTabs } from './meeting-tabs';

const meta: Meta<typeof MeetingTabs> = {
  title: 'APP/mypage/meeting-tabs',
  component: MeetingTabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MeetingTabs>;

export const Default: Story = {
  name: '반응형',
};
