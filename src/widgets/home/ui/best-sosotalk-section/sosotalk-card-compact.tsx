'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import { Heart, MessageCircle } from 'lucide-react';

import { type SosoTalkPostCardItem, sosotalkPostDetailQueryOptions } from '@/entities/post';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar/avatar';

type SosoTalkCardCompactProps = Omit<SosoTalkPostCardItem, 'content'>;

export function SosoTalkCardCompact({
  id,
  title,
  imageUrl,
  authorName,
  authorImageUrl,
  likeCount,
  commentCount,
  createdAt,
}: SosoTalkCardCompactProps) {
  const queryClient = useQueryClient();

  const prefetchPostDetail = () => {
    void queryClient.prefetchQuery(sosotalkPostDetailQueryOptions(id));
  };

  return (
    <Link
      href={`/sosotalk/${id}`}
      onMouseEnter={prefetchPostDetail}
      onFocus={prefetchPostDetail}
      className="focus-visible:ring-ring block rounded-[14px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <article className="border-border bg-card flex h-[307px] w-[302px] flex-col overflow-hidden rounded-[14px] border transition-transform hover:-translate-y-0.5">
        <div className="relative h-[170px] w-full">
          <Image
            src={imageUrl}
            alt="소소톡 게시글 이미지"
            fill
            sizes="302px"
            className="object-cover object-center"
          />
        </div>

        <div className="flex h-[51px] items-center px-[14px]">
          <h3 className="line-clamp-2 text-base font-bold">{title}</h3>
        </div>

        <div className="flex h-[73px] flex-col justify-between px-[14px] pt-[8px] pb-[13px]">
          <div className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-[6px]">
              <Avatar className="h-6 w-6">
                <AvatarImage src={authorImageUrl} alt={authorName} />
                <AvatarFallback>{authorName?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{authorName}</span>
            </div>

            <div className="text-sosoeat-gray-700 flex items-center gap-[10px] text-xs font-medium">
              <span className="inline-flex items-center gap-[4px]">
                <Heart className="fill-sosoeat-gray-600 h-3.5 w-3.5 shrink-0 stroke-0" />
                <span>{likeCount}</span>
              </span>
              <span className="inline-flex items-center gap-[4px]">
                <MessageCircle className="fill-sosoeat-gray-600 h-3.5 w-3.5 shrink-0 stroke-0" />
                <span>{commentCount}</span>
              </span>
            </div>
          </div>

          <span className="text-xs font-medium text-gray-500">{createdAt}</span>
        </div>
      </article>
    </Link>
  );
}
