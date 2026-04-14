import type { ReactNode } from 'react';

import Image from 'next/image';

import DOMPurify from 'isomorphic-dompurify';

import type { SosoTalkPostBodyProps } from './sosotalk-post-detail.types';

interface SosoTalkPostDetailBodyProps extends SosoTalkPostBodyProps {
  children?: ReactNode;
}

export function SosoTalkPostDetailBody({
  title,
  contentHtml,
  imageUrl,
  children,
}: SosoTalkPostDetailBodyProps) {
  const normalizedContentHtml = DOMPurify.sanitize(contentHtml.trim());

  return (
    <section className="border-sosoeat-gray-300 mt-6 flex flex-col gap-5 border-t pt-5 md:mt-8 md:gap-6 md:pt-6">
      <div
        className="text-sosoeat-gray-800 prose prose-p:my-0 prose-p:min-h-[1.85em] prose-strong:font-bold prose-em:italic prose-u:underline max-w-none text-lg font-normal [&_li]:my-1 [&_li]:pl-1 [&_li>p]:my-0 [&_ol]:my-0 [&_ol]:list-outside [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:whitespace-pre-wrap [&_p+ol]:mt-3 [&_p+ul]:mt-3 [&_ul]:my-0 [&_ul]:list-outside [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: normalizedContentHtml }}
      />

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
