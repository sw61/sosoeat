import Image from 'next/image';

import type { MeetingDetailBannerProps } from './meeting-detail-banner.type';

export default function MeetingDetailBanner({
  imageUrl,
  alt,
  titleContent,
  subtitle,
  className,
}: MeetingDetailBannerProps) {
  return (
    <div
      className={`flex w-full items-start justify-center px-4 max-[375px]:px-0 sm:px-6 ${className ?? ''}`}
    >
      <div className="relative box-border w-full max-w-[1140px] shrink-0 overflow-hidden rounded-none max-[375px]:mt-[44px] max-[375px]:h-[192px] max-[375px]:max-h-[192px] max-[375px]:min-h-[192px] min-[376px]:mt-[94px] min-[376px]:h-[220px] min-[376px]:max-h-[220px] min-[376px]:min-h-[220px] min-[376px]:rounded-[25px] min-[744px]:h-[244px] min-[744px]:max-h-[244px] min-[744px]:min-h-[244px] min-[1920px]:h-[280px] min-[1920px]:max-h-[280px] min-[1920px]:min-h-[280px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 375px) 375px, (max-width: 743px) 100vw, (max-width: 1919px) 1140px, 1140px"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.55)]" aria-hidden />
        <div className="absolute inset-0 z-10">
          {titleContent}
          {subtitle != null ? <div className="max-[490px]:hidden">{subtitle}</div> : null}
        </div>
      </div>
    </div>
  );
}
