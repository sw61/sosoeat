'use client';

import Link from 'next/link';

import { useFavoritesCount } from '@/entities/favorites';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

import { useJoinedMeetings } from '../../model/mypage.queries';

import { CountCardProps } from './count-card.types';
import { cardVariants, countVariants } from './count-card.variants';

const TITLE = {
  meeting: '참여 모임',
  favorite: '찜한 모임',
  post: '게시글 작성',
} as const;

export function CountCard({ count, variant = 'meeting', className, href }: CountCardProps) {
  const card = (
    <Card
      className={cn(cardVariants({ variant }), href && 'transition hover:brightness-95', className)}
    >
      <CardHeader>
        <CardTitle>
          <p className={cn(countVariants({ variant }))}>{count}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sosoeat-gray-600 text-[11px]">{TITLE[variant]}</p>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="max-w-85 min-w-0 flex-1">
        {card}
      </Link>
    );
  }

  return <div className="max-w-85 min-w-0 flex-1">{card}</div>;
}

export function FavoriteCountCard({ initialCount }: { initialCount: number }) {
  const { data: count } = useFavoritesCount(initialCount);
  return <CountCard variant="favorite" count={count} href="/mypage?tab=favorite" />;
}

export function MeetingCountCard({ initialCount }: { initialCount: number }) {
  const { data } = useJoinedMeetings();
  const count = data?.data.length ?? initialCount;
  return <CountCard variant="meeting" count={count} href="/mypage?tab=all" />;
}

export function PostCountCard({ initialCount }: { initialCount: number }) {
  return <CountCard variant="post" count={initialCount} href="/sosotalk" />;
}
