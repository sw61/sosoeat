import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { MeetingDetailBannerProps } from './meeting-detail-banner.type';

// mobile-first (no arbitrary px): base layout first, scale with sm/md/lg.
const bannerShellClass =
  'relative w-full max-w-6xl overflow-hidden rounded-none mt-11 h-48 sm:mt-24 sm:h-56 sm:rounded-3xl lg:h-60';

const headlineClass =
  'font-sans text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl';

const subtitleWrapClass =
  'mt-4 hidden max-w-md text-base font-normal leading-7 text-white/80 md:block';

export default function MeetingDetailBanner({
  imageUrl,
  alt,
  titleContent,
  subtitleContent,
  subtitle,
  className,
}: MeetingDetailBannerProps) {
  return (
    <div className={cn('flex w-full items-start justify-center', className)}>
      <div className={bannerShellClass}>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1140px"
          priority
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.55),rgba(0,0,0,0.55))]"
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-start p-6 sm:p-10">
          <h2 className={headlineClass}>
            {titleContent} <span className="text-sosoeat-orange-500">{subtitleContent}</span>
          </h2>

          {subtitle != null ? (
            <div
              className={subtitleWrapClass}
              style={{
                fontFamily: "'Noto Sans KR', var(--font-pretendard-local), sans-serif",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
