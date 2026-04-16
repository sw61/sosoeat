'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import { Heart, MessageCircle } from 'lucide-react';

import { sosotalkPostDetailQueryOptions } from '@/entities/post';
import { toHttpsUrl } from '@/shared/lib/to-https-url';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar/avatar';

import type { SosoTalkCardProps } from './sosotalk-card.types';

export function SosoTalkCard({
  id,
  title,
  content,
  imageUrl,
  authorName,
  authorImageUrl,
  likeCount,
  commentCount,
  createdAt,
}: SosoTalkCardProps) {
  const queryClient = useQueryClient();

  const prefetchPostDetail = () => {
    void queryClient.prefetchQuery(sosotalkPostDetailQueryOptions(id));
  };

  return (
    <Link
      href={`/sosotalk/${id}`}
      onMouseEnter={prefetchPostDetail}
      onFocus={prefetchPostDetail}
      className="focus-visible:ring-ring block w-[343px] rounded-[14px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
    >
      <article className="border-border bg-card flex h-[352px] w-[343px] flex-col overflow-hidden rounded-[14px] border transition-transform hover:-translate-y-0.5 sm:w-[302px]">
        <div className="relative h-[170px] w-full">
          <Image
            src={imageUrl}
            alt="소소톡 게시글 이미지"
            fill
            sizes="302px"
            className="object-cover object-center"
          />
        </div>

        <div className="px-[14px] pt-[14px] pb-[14px]">
          <h3 className="pb-[4px] text-base font-bold">{title}</h3>
          <p className="line-clamp-2 text-sm font-normal">{content}</p>
        </div>

        <div className="mt-auto border-t px-[14px] pt-[8px] pb-[12px]">
          <div className="flex items-center justify-between pb-[8px] text-xs font-medium">
            <div className="flex items-center gap-[6px]">
              <Avatar className="h-8 w-8">
                <AvatarImage src={toHttpsUrl(authorImageUrl)} alt={authorName} />
                <AvatarFallback>{authorName?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span>{authorName}</span>
            </div>

            <div className="text-sosoeat-gray-700 flex items-center gap-[12px] text-[13px] font-medium">
              <span className="inline-flex items-center gap-[6px]">
                <Heart className="fill-sosoeat-gray-600 h-4 w-4 shrink-0 stroke-0" />
                <span>{likeCount}</span>
              </span>
              <span className="inline-flex items-center gap-[6px]">
                <MessageCircle className="fill-sosoeat-gray-600 h-4 w-4 shrink-0 stroke-0" />
                <span>{commentCount}</span>
              </span>
            </div>
          </div>

          <span className="mt-[14px] text-xs font-medium text-gray-500">{createdAt}</span>
        </div>
      </article>
    </Link>
  );
}
