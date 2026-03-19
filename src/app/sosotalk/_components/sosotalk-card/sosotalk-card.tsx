import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar';

import { SosoTalkCardProps } from './sosotalk-card.types';

export function SosoTalkCard({
  tag,
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
    <article className="border-border bg-card h-[352px] w-[302px] overflow-hidden rounded-[14px] border">
      {/* 상단 대표 이미지 */}
      <div className="h-[170px] w-[302px]">
        <img
          src={'https://www.geoje.go.kr/upload_data/photodb/thumb/2025010621142591973.jpg'}
          alt="대표 이미지"
          className="h-full w-full object-cover"
        />
      </div>
      {/* 태그 + 제목 + 내용 */}
      <div className="border-b px-[14px] pt-[6px] pb-[16px]">
        <div className="text-sosoeat-orange-700 text-sm font-medium">{tag}</div>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="line-clamp-2 text-sm font-normal">{content}</p>
      </div>

      {/* 하단 정보 영역 */}
      <div className="px-[14px] pt-[8px] pb-[10px]">
        {/* 프로필/작성자 + 좋아요/댓글 */}
        <div className="flex items-center justify-between text-xs font-medium">
          {/* 프로필 이미지 + 작성자 이름 */}
          <div className="flex items-center gap-[6px]">
            <Avatar className="h-8 w-8">
              <AvatarImage src={authorImageUrl} alt={authorName} />
              <AvatarFallback>{authorName?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            {/* <span>{imageUrl}</span> */}
            <span className="">{authorName}</span>
          </div>
          {/* 좋아요 + 댓글 수 */}
          <div className="flex items-center gap-[10px]">
            <span className="gap-[2px]">❤️{likeCount}</span>
            <span className="gap-[2px]">🗨️{commentCount}</span>
          </div>
        </div>
        <span className="text-xs font-medium text-gray-500">{createdAt}</span>
      </div>
    </article>
  );
}
