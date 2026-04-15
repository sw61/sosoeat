'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import { Plus } from 'lucide-react';

import type { GetSosoTalkPostListResponse } from '@/entities/post';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { SosoTalkBanner } from '../sosotalk-banner';
import { SosoTalkCard } from '../sosotalk-card';
import { SosoTalkFilterBar } from '../sosotalk-filter-bar';

import { useSosoTalkMainPage } from './model';

interface SosoTalkMainPageProps {
  className?: string;
  initialData?: GetSosoTalkPostListResponse;
  initialTab?: 'all' | 'popular';
  initialSort?: 'comments' | 'likes' | 'latest';
}

const SOSOTALK_BANNER_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop';

export const SosoTalkMainPage = ({
  className,
  initialData,
  initialTab,
  initialSort,
}: SosoTalkMainPageProps) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    root: null,
  });
  const {
    activeSort,
    activeTab,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    posts,
    setActiveSort,
    setActiveTab,
  } = useSosoTalkMainPage({ initialData, initialTab, initialSort });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <div className={cn('bg-background min-h-screen w-full bg-[#f9f9f9] pb-24 md:pb-28', className)}>
      <main className="mx-auto flex w-full max-w-[1280px] flex-col pt-0 xl:px-0 xl:pt-4">
        <SosoTalkBanner imageUrl={SOSOTALK_BANNER_IMAGE} alt="소소톡 배너 이미지" />

        <div className="px-4 md:px-6 xl:px-0">
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
                  <>
                    <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:justify-items-stretch">
                      {posts.map((post) => (
                        <SosoTalkCard key={post.id} {...post} />
                      ))}
                    </div>
                    <div ref={ref} className="flex h-1 items-center justify-center" />
                    {isFetchingNextPage ? (
                      <div className="flex py-8">
                        <p className="text-sosoeat-gray-500 mx-auto text-sm">
                          게시글을 더 불러오는 중이에요.
                        </p>
                      </div>
                    ) : null}
                    {!hasNextPage ? (
                      <div className="flex py-8">
                        <p className="text-sosoeat-gray-500 mx-auto text-sm">
                          모든 게시글을 불러왔어요.
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="flex min-h-[240px] items-center justify-center">
                    <p className="text-sosoeat-gray-400 text-sm">아직 등록된 게시글이 없어요.</p>
                  </div>
                )}
              </>
            ) : null}
          </section>
        </div>
      </main>

      <Button
        asChild
        variant="ghost"
        className={cn(
          'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 fixed right-5 bottom-[calc(20px+env(safe-area-inset-bottom))] z-50 h-14 rounded-full px-5 text-base font-bold text-white shadow-lg hover:text-white',
          'md:right-8 md:bottom-8 md:h-16 md:px-7 md:text-lg'
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
