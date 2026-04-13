import type { Metadata } from 'next';

import { SosoTalkMainPage } from '@/widgets/sosotalk';

export const metadata: Metadata = {
  title: '소소톡',
  description:
    '소소한 일상, 취미, 모임 후기를 자유롭게 나눠보세요. 비슷한 관심사를 가진 사람들과 이야기를 시작해보세요.',
  openGraph: {
    title: '소소톡 | 소소잇',
    description:
      '소소한 일상, 취미, 모임 후기를 자유롭게 나눠보세요. 비슷한 관심사를 가진 사람들과 이야기를 시작해보세요.',
  },
};

export default function SosoTalkPage() {
  return <SosoTalkMainPage />;
}
