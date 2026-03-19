import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar';

import { SosoTalkCardProps } from './sosotalk-card.types';

export function SosoTalkCard({
  title,
  content,
  imageUrl,
  authorName,
  authorImageUrl,
  likeCount,
  commentCount,
  createdAt,
}: SosoTalkCardProps) {
  return (
    <article className="border-border bg-card flex h-[352px] w-[302px] flex-col overflow-hidden rounded-[14px] border">
      {/* 상단 대표 이미지 */}
      <div className="h-[170px] w-full">
        <img src={imageUrl} alt="대표 이미지" className="h-full w-full object-cover" />
      </div>

      {/* 제목 + 내용 */}
      <div className="px-[14px] pt-[14px] pb-[14px]">
        <h3 className="pb-[4px] text-[16px] leading-[24px] font-bold">{title}</h3>
        <p className="line-clamp-2 text-[14px] leading-[20px] font-normal">{content}</p>
      </div>

      {/* 하단 정보 영역 */}
      <div className="border-t px-[14px] pt-[8px] pb-[12px]">
        <div className="flex items-center justify-between text-xs font-medium">
          {/* 프로필 이미지 + 작성자 이름 */}
          <div className="flex items-center gap-[6px]">
            <Avatar className="h-8 w-8">
              <AvatarImage src={authorImageUrl} alt={authorName} />
              <AvatarFallback>{authorName?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span>{authorName}</span>
          </div>

          {/* 좋아요 + 댓글 수 */}
          <div className="flex items-center gap-[10px]">
            <span className="flex items-center gap-[2px]">
              <span>❤️</span>
              <span>{likeCount}</span>
            </span>
            <span className="flex items-center gap-[2px]">
              <span>🗨️</span>
              <span>{commentCount}</span>
            </span>
          </div>
        </div>

        <span className="mt-[14px] block text-xs font-medium text-gray-500">{createdAt}</span>
      </div>
    </article>
  );
}
