'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Plus } from 'lucide-react';

import { NavigationBar } from '@/components/common/navigation-bar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { SosoTalkBanner } from '../sosotalk-banner';
import { SosoTalkCard, type SosoTalkCardProps } from '../sosotalk-card';
import {
  SosoTalkFilterBar,
  type SosoTalkSortValue,
  type SosoTalkTabValue,
} from '../sosotalk-filter-bar';

interface SosoTalkMainPageProps {
  className?: string;
}

interface SosoTalkMainPost extends SosoTalkCardProps {
  id: number;
  isPopular: boolean;
}

const SOSOTALK_BANNER_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop';

const SOSOTALK_POSTS: SosoTalkMainPost[] = [
  {
    id: 1,
    title: '혼밥하기 좋은 성수 식당 추천해요',
    content:
      '조용하게 한 끼 하기 좋은 곳 찾고 있었는데, 웨이팅 적고 음식도 깔끔했던 곳들 공유해요.',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    authorName: '민지',
    authorImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
    likeCount: 24,
    commentCount: 8,
    createdAt: '2026.03.24',
    isPopular: true,
  },
  {
    id: 2,
    title: '직장인 점심 도시락 메뉴 같이 고민해요',
    content:
      '매일 비슷한 메뉴라 지겨워서요. 간단하게 준비하기 좋았던 도시락 메뉴 있으면 알려주세요.',
    imageUrl:
      'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
    authorName: '도윤',
    authorImageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    likeCount: 11,
    commentCount: 14,
    createdAt: '2026.03.23',
    isPopular: false,
  },
  {
    id: 3,
    title: '비 오는 날 생각나는 국물 요리 TALK',
    content: '칼국수, 순두부, 쌀국수 중에서 오늘 같은 날 제일 당기는 메뉴가 뭔지 궁금해요.',
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    authorName: '서현',
    authorImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop',
    likeCount: 31,
    commentCount: 19,
    createdAt: '2026.03.22',
    isPopular: true,
  },
  {
    id: 4,
    title: '야식으로 먹기 좋은 배달 메뉴 추천',
    content: '너무 헤비하지 않으면서 만족감 있는 메뉴 찾고 있어요. 최근에 괜찮았던 조합 있나요?',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    authorName: '지훈',
    authorImageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
    likeCount: 17,
    commentCount: 6,
    createdAt: '2026.03.21',
    isPopular: false,
  },
  {
    id: 5,
    title: '다이어트 중인데 맛있었던 샐러드집 있어요?',
    content: '포만감 있고 재료 신선한 샐러드집 찾고 있어요. 배달 말고 매장 방문 기준도 좋아요.',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
    authorName: '하린',
    authorImageUrl:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=300&auto=format&fit=crop',
    likeCount: 28,
    commentCount: 10,
    createdAt: '2026.03.20',
    isPopular: true,
  },
  {
    id: 6,
    title: '집들이 음식 메뉴 구성 같이 봐주세요',
    content:
      '파스타, 샐러드, 핑거푸드 정도 생각 중인데 너무 많거나 부족하지 않을지 의견 듣고 싶어요.',
    imageUrl:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop',
    authorName: '예준',
    authorImageUrl:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=300&auto=format&fit=crop',
    likeCount: 13,
    commentCount: 12,
    createdAt: '2026.03.19',
    isPopular: false,
  },
  {
    id: 7,
    title: '퇴근 후 가볍게 먹기 좋은 메뉴 추천',
    content:
      '늦은 저녁이라 부담 없는 메뉴를 찾고 있어요. 간단하지만 만족감 있었던 메뉴 있으면 알려주세요.',
    imageUrl:
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop',
    authorName: '수아',
    authorImageUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    likeCount: 22,
    commentCount: 9,
    createdAt: '2026.03.18',
    isPopular: true,
  },
  {
    id: 8,
    title: '우리 동네 브런치 맛집 추천받아요',
    content:
      '주말 오전에 가기 좋은 브런치 집 찾고 있어요. 분위기 좋고 오래 앉아 있기 좋은 곳이면 더 좋아요.',
    imageUrl:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1200&auto=format&fit=crop',
    authorName: '태윤',
    authorImageUrl:
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop',
    likeCount: 15,
    commentCount: 7,
    createdAt: '2026.03.17',
    isPopular: false,
  },
  {
    id: 9,
    title: '봄 제철 음식 뭐부터 먹을지 고민 중',
    content:
      '냉이, 달래, 주꾸미처럼 봄 느낌 나는 메뉴 중에 제일 먼저 먹고 싶은 음식이 뭔지 궁금해요.',
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop',
    authorName: '유진',
    authorImageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    likeCount: 27,
    commentCount: 13,
    createdAt: '2026.03.16',
    isPopular: true,
  },
  {
    id: 10,
    title: '간단한 집밥 반찬 추천해주세요',
    content:
      '평일 저녁에 빠르게 만들 수 있는 반찬이 필요해요. 자주 해 먹는 메뉴 있으면 참고하고 싶어요.',
    imageUrl:
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=1200&auto=format&fit=crop',
    authorName: '은호',
    authorImageUrl:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=300&auto=format&fit=crop',
    likeCount: 18,
    commentCount: 5,
    createdAt: '2026.03.15',
    isPopular: false,
  },
  {
    id: 11,
    title: '매운 음식 당길 때 어디까지 가능해요?',
    content:
      '엽떡, 마라탕, 불닭처럼 매운 음식 좋아하는데 다들 어느 정도 맵기까지 즐기는지 궁금해요.',
    imageUrl:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
    authorName: '현우',
    authorImageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    likeCount: 34,
    commentCount: 18,
    createdAt: '2026.03.14',
    isPopular: true,
  },
  {
    id: 12,
    title: '재료 남았을 때 활용하기 좋은 요리',
    content:
      '냉장고에 조금씩 남은 재료를 정리하고 싶은데, 볶음밥 말고도 자주 해 먹는 메뉴가 있나요?',
    imageUrl:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop',
    authorName: '채원',
    authorImageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=300&auto=format&fit=crop',
    likeCount: 12,
    commentCount: 11,
    createdAt: '2026.03.13',
    isPopular: false,
  },
];

const sortPosts = (posts: SosoTalkMainPost[], activeSort: SosoTalkSortValue) => {
  const sortedPosts = [...posts];

  if (activeSort === 'comments') {
    return sortedPosts.sort((a, b) => b.commentCount - a.commentCount);
  }

  if (activeSort === 'likes') {
    return sortedPosts.sort((a, b) => b.likeCount - a.likeCount);
  }

  return sortedPosts.sort((a, b) => b.id - a.id);
};

export const SosoTalkMainPage = ({ className }: SosoTalkMainPageProps) => {
  const [activeTab, setActiveTab] = useState<SosoTalkTabValue>('all');
  const [activeSort, setActiveSort] = useState<SosoTalkSortValue>('latest');

  const posts =
    activeTab === 'popular' ? SOSOTALK_POSTS.filter((post) => post.isPopular) : SOSOTALK_POSTS;
  const filteredPosts = sortPosts(posts, activeSort);

  return (
    <div className={cn('bg-background min-h-screen w-full bg-[#f9f9f9] pb-24 md:pb-28', className)}>
      <NavigationBar />

      <main className="mx-auto flex w-full max-w-[1280px] flex-col px-4 pt-4 md:px-6 md:pt-6 xl:px-0">
        <SosoTalkBanner imageUrl={SOSOTALK_BANNER_IMAGE} alt="소소토크 배너 이미지" />

        <SosoTalkFilterBar
          activeTab={activeTab}
          activeSort={activeSort}
          onTabChange={setActiveTab}
          onSortChange={setActiveSort}
        />

        <section className="pt-2">
          <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:justify-items-stretch">
            {filteredPosts.map(({ id, isPopular: _isPopular, ...post }) => (
              <SosoTalkCard key={id} {...post} />
            ))}
          </div>
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
