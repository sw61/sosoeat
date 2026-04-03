import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { KakaoMap } from './kakao-map';

const meta: Meta<typeof KakaoMap> = {
  title: 'Common/KakaoMap',
  component: KakaoMap,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KakaoMap>;

export const Default: Story = {
  args: {
    latitude: 37.5697,
    longitude: 126.9822,
  },
};
