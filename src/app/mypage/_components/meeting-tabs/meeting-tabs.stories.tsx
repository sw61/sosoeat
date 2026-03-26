import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingTabs } from './meeting-tabs';

const meta: Meta<typeof MeetingTabs> = {
  title: 'APP/mypage/meeting-tabs',
  component: MeetingTabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MeetingTabs>;

export const Default: Story = {};

export const Empty: Story = {};
