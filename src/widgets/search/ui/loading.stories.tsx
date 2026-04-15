import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Loading from './loading';

const meta: Meta<typeof Loading> = {
  title: 'widgets/search/loading',
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;

export const Default: StoryObj<typeof Loading> = {
  render: () => <Loading />,
};
