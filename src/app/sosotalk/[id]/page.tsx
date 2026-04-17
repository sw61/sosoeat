import type { Metadata } from 'next';

import { getDefaultSocialImages } from '@/shared/lib/social-metadata';
import { SosoTalkPostDetailPage } from '@/widgets/sosotalk';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const detailPath = `/sosotalk/${id}`;

  return {
    title: '소소톡 게시글',
    description: '소소잇에서 소소한 일상과 이야기를 확인해보세요.',
    openGraph: {
      title: '소소톡 게시글',
      description: '소소잇에서 소소한 일상과 이야기를 확인해보세요.',
      url: detailPath,
      images: getDefaultSocialImages(),
    },
    twitter: {
      card: 'summary_large_image',
      title: '소소톡 게시글',
      description: '소소잇에서 소소한 일상과 이야기를 확인해보세요.',
      images: getDefaultSocialImages(),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <SosoTalkPostDetailPage postId={id} />;
}
