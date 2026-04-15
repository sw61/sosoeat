import type { Metadata } from 'next';

import * as Sentry from '@sentry/nextjs';

import { apiServer } from '@/shared/api/api-server';
import { SosoTalkPostDetailPage } from '@/widgets/sosotalk';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const response = await apiServer.get(`/posts/${id}`).catch((error) => {
    Sentry.captureException(error, {
      tags: {
        area: 'sosotalk-detail',
        location: 'generateMetadata',
      },
      extra: {
        postId: id,
      },
    });

    return null;
  });

  if (!response?.ok) return {};

  const post = await response.json().catch((error) => {
    Sentry.captureException(error, {
      tags: {
        area: 'sosotalk-detail',
        location: 'generateMetadata.json',
      },
      extra: {
        postId: id,
      },
    });

    return null;
  });

  if (!post) return {};

  return {
    title: post.title,
    description: post.content?.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150),
      ...(post.image && { images: [{ url: post.image }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content?.slice(0, 150),
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <SosoTalkPostDetailPage postId={id} />;
}
