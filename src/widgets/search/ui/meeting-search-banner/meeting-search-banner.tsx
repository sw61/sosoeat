import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

import type { MeetingSearchBannerProps } from './meeting-search-banner.type';

const bannerShellClass =
  'relative h-48 w-full overflow-hidden rounded-xlsm:h-56 md:h-[244px] md:max-w-[1140px] md:rounded-2xl';

const headlineClass =
  'font-pretendard-local text-3xl leading-[1.2] font-extrabold tracking-[-0.03em] text-white  md:text-[46px] md:leading-[55px] md:tracking-[-1.38px]';

const subtitleWrapClass =
  'mt-2 hidden max-w-[273px] text-base leading-7 font-normal text-white/80 md:block';

export function MeetingSearchBanner({ className }: MeetingSearchBannerProps) {
  return (
    <div className={cn('flex w-full items-start justify-center px-0 pb-4 md:px-4', className)}>
      <div className={bannerShellClass}>
        <Image
          src={'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80'}
          alt={'모임 검색 배너 이미지'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1140px"
          priority
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55),rgba(0,0,0,0.55))]"
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-start px-10 pt-10 md:px-26 md:pt-9.75">
          <h2 className={headlineClass}>
            <span>{'함께하면'} </span>
            <span className="text-sosoeat-orange-500">
              <br />
              {'더 맛있어요'}
            </span>
          </h2>

          {
            <div
              className={subtitleWrapClass}
              style={{
                fontFamily: "'Noto Sans KR', var(--font-pretendard-local), sans-serif",
              }}
            >
              {'가고 싶었던 맛집, 혼자 가기 아쉬웠죠? 모여요에서 같이 먹을 사람을 찾아보세요.'}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
