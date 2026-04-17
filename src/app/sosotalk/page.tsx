import type { Metadata } from 'next';

import * as Sentry from '@sentry/nextjs';
import { SearchParams } from 'nuqs';

import { getSosoTalkPosts } from '@/entities/post/index.server';
import { getDefaultSocialImages } from '@/shared/lib/social-metadata';
import {
  createSosoTalkMainPageQueryParams,
  SosoTalkMainPage,
  sosotalkSearchParamsCache,
} from '@/widgets/sosotalk';

export const metadata: Metadata = {
  title: '소소톡',
  description:
    '소소한 일상, 취미, 모임 후기를 자유롭게 나눠보세요. 비슷한 관심사를 가진 사람들과 이야기를 시작해보세요.',
  openGraph: {
    title: '소소톡 | 소소잇',
    description:
      '소소한 일상, 취미, 모임 후기를 자유롭게 나눠보세요. 비슷한 관심사를 가진 사람들과 이야기를 시작해보세요.',
    images: getDefaultSocialImages(),
  },
  twitter: {
    card: 'summary_large_image',
    title: '소소톡 | 소소잇',
    description:
      '소소한 일상, 취미, 모임 후기를 자유롭게 나눠보세요. 비슷한 관심사를 가진 사람들과 이야기를 시작해보세요.',
    images: getDefaultSocialImages(),
  },
};

type SosoTalkPageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function SosoTalkPage({ searchParams }: SosoTalkPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const { tab, sort } = sosotalkSearchParamsCache.parse(resolvedSearchParams);
  const queryParams = createSosoTalkMainPageQueryParams(tab, sort);

  const initialData = await getSosoTalkPosts(queryParams).catch((error) => {
    Sentry.captureException(error, {
      tags: {
        area: 'sosotalk-list',
        action: 'load-initial-data',
      },
      extra: {
        queryParams,
      },
    });

    return null;
  });

  return (
    <SosoTalkMainPage initialData={initialData ?? undefined} initialTab={tab} initialSort={sort} />
  );
}
