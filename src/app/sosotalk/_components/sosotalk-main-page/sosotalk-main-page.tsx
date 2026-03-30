'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { GetSosoTalkPostListParams } from '@/services/sosotalk';
import { mapPostToSosoTalkCardItem, useGetSosoTalkPostList } from '@/services/sosotalk';

import { SosoTalkBanner } from '../sosotalk-banner';
import { SosoTalkCard } from '../sosotalk-card';
import {
  SosoTalkFilterBar,
  type SosoTalkSortValue,
  type SosoTalkTabValue,
} from '../sosotalk-filter-bar';

interface SosoTalkMainPageProps {
  className?: string;
}

const SOSOTALK_BANNER_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop';

export const SosoTalkMainPage = ({ className }: SosoTalkMainPageProps) => {
  const [activeTab, setActiveTab] = useState<SosoTalkTabValue>('all');
  const [activeSort, setActiveSort] = useState<SosoTalkSortValue>('latest');

  const queryParams = useMemo<GetSosoTalkPostListParams>(
    () => ({
      type: activeTab === 'popular' ? 'best' : 'all',
      sortBy:
        activeSort === 'comments'
          ? 'commentCount'
          : activeSort === 'likes'
            ? 'likeCount'
            : 'createdAt',
      sortOrder: 'desc' as const,
      size: 10,
    }),
    [activeSort, activeTab]
  );

  const { data, isLoading, isError } = useGetSosoTalkPostList(queryParams);

  const posts = useMemo(() => data?.data.map(mapPostToSosoTalkCardItem) ?? [], [data]);

  return (
    <div className={cn('bg-background min-h-screen w-full bg-[#f9f9f9] pb-24 md:pb-28', className)}>
      <main className="mx-auto flex w-full max-w-[1280px] flex-col px-4 pt-4 md:px-6 md:pt-6 xl:px-0">
        <SosoTalkBanner imageUrl={SOSOTALK_BANNER_IMAGE} alt="소소톡 배너 이미지" />

        <SosoTalkFilterBar
          activeTab={activeTab}
          activeSort={activeSort}
          onTabChange={setActiveTab}
          onSortChange={setActiveSort}
        />

        <section className="pt-2">
          {isLoading ? (
            <div className="flex min-h-[240px] items-center justify-center">
              <p className="text-sosoeat-gray-500 text-sm">게시글을 불러오는 중이에요.</p>
            </div>
          ) : null}

          {isError ? (
            <div className="flex min-h-[240px] items-center justify-center">
              <p className="text-sosoeat-gray-500 text-sm">
                게시글 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
              </p>
            </div>
          ) : null}

          {!isLoading && !isError ? (
            <>
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:justify-items-stretch">
                  {posts.map((post) => (
                    <SosoTalkCard key={post.id} {...post} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[240px] items-center justify-center">
                  <p className="text-sosoeat-gray-400 text-sm">아직 등록된 게시글이 없어요.</p>
                </div>
              )}
            </>
          ) : null}
        </section>
      </main>

      <Button
        asChild
        className={cn(
          'bg-sosoeat-orange-600 fixed right-5 bottom-5 z-50 h-14 rounded-full px-5 text-base font-bold text-white shadow-lg',
          'hover:bg-sosoeat-orange-700 md:right-8 md:bottom-8 md:h-16 md:px-7 md:text-lg'
        )}
      >
        <Link href="/sosotalk/write">
          <Plus className="size-5" aria-hidden />
          게시글 작성
        </Link>
      </Button>
    </div>
  );
};
