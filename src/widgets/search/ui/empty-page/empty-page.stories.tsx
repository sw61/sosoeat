import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { EmptyPage } from './index';

const meta: Meta<typeof EmptyPage> = {
  title: 'meetings/_components/empty-page',
  component: EmptyPage,
} satisfies Meta<typeof EmptyPage>;

export default meta;

export const Default: StoryObj<typeof EmptyPage> = {
  render: () => <EmptyPage />,
};
