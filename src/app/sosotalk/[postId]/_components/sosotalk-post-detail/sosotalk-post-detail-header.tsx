import { CalendarDays, MoreHorizontal } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar';
import { Badge } from '@/components/ui/badge/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';

import type { SosoTalkPostHeaderProps } from './sosotalk-post-detail.types';

export function SosoTalkPostDetailHeader({
  title,
  authorName,
  authorImageUrl,
  categoryLabel,
  statusLabel,
  createdAt,
  createdAtDateTime,
  isAuthor = false,
  onMoreClick,
  onEditClick,
  onDeleteClick,
}: SosoTalkPostHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:gap-5">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-1 flex-col gap-4 md:gap-5">
          {(categoryLabel || statusLabel) && (
            <div className="flex flex-wrap items-center gap-3">
              {categoryLabel && (
                <Badge
                  variant="outline"
                  className="border-sosoeat-orange-600 text-sosoeat-orange-600 h-7 rounded-full px-3 text-sm font-semibold"
                >
                  {categoryLabel}
                </Badge>
              )}
              {statusLabel && (
                <Badge className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-600 h-7 rounded-full px-3 text-sm font-semibold text-white">
                  {statusLabel}
                </Badge>
              )}
            </div>
          )}

          <h1 className="text-sosoeat-gray-900 text-2xl font-semibold md:text-3xl">{title}</h1>
        </div>

        {isAuthor ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="text-sosoeat-gray-500 hover:text-sosoeat-gray-700 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
                aria-label="게시글 메뉴"
                onClick={onMoreClick}
              >
                <MoreHorizontal className="h-7 w-7" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              <DropdownMenuItem onClick={onEditClick}>수정하기</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={onDeleteClick}>
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="border-sosoeat-gray-300 h-8 w-8 border md:h-9 md:w-9">
            <AvatarImage src={authorImageUrl} alt={authorName} />
            <AvatarFallback>{authorName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="text-sosoeat-gray-900 text-base font-semibold">{authorName}</span>
        </div>

        <div className="text-sosoeat-gray-700 flex shrink-0 items-center gap-2 text-sm font-medium md:text-base">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <time dateTime={createdAtDateTime ?? undefined}>{createdAt}</time>
        </div>
      </div>
    </header>
  );
}
