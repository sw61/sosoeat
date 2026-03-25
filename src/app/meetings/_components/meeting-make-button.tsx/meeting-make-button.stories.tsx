import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MeetingMakeButton } from './meeting-make-button';

const meta = {
  title: 'app/meetings/meeting-make-button',
  component: MeetingMakeButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MeetingMakeButton>;

export default meta;

export const Default: StoryObj<typeof MeetingMakeButton> = {
  render: function MeetingMakeButtonStory() {
    return <MeetingMakeButton />;
  },
};
