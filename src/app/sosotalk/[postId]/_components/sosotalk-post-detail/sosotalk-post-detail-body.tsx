import type { ReactNode } from 'react';

import Image from 'next/image';

import type { SosoTalkPostBodyProps } from './sosotalk-post-detail.types';

interface SosoTalkPostDetailBodyProps extends SosoTalkPostBodyProps {
  children?: ReactNode;
}

export function SosoTalkPostDetailBody({
  title,
  content,
  imageUrl,
  children,
}: SosoTalkPostDetailBodyProps) {
  const normalizedContent = content.trim();

  return (
    <section className="border-sosoeat-gray-300 mt-6 flex flex-col gap-5 border-t pt-5 md:mt-8 md:gap-6 md:pt-6">
      <p className="text-sosoeat-gray-800 text-lg font-normal whitespace-pre-wrap">
        {normalizedContent}
      </p>

      {imageUrl ? (
        <div className="border-sosoeat-gray-300 bg-sosoeat-gray-100 relative aspect-[303/246] w-full max-w-[303px] overflow-hidden rounded-[18px] border md:max-w-[360px] lg:max-w-[420px] xl:max-w-[506px] xl:rounded-[24px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 303px, (max-width: 1023px) 360px, (max-width: 1279px) 420px, 506px"
            priority
          />
        </div>
      ) : null}

      {children}
    </section>
  );
}
