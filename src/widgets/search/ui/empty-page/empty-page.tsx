import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

/** 뷰포트별 상하 여백 — Jest에서 클래스 포함 여부로 검증 */
export const EMPTY_PAGE_MARGIN_CLASSES = 'my-[80px] md:my-[100px] lg:my-[120px]';

export const EmptyPage = () => {
  return (
    <div
      data-testid="empty-page-root"
      className={cn(
        EMPTY_PAGE_MARGIN_CLASSES,
        'flex h-full w-full flex-col items-center justify-center'
      )}
    >
      <Image
        src="/images/empty-page.svg"
        alt="Empty Page"
        width={217}
        height={144}
        className="hidden md:block"
      />
      <Image
        src="/images/empty-page-small.svg"
        alt="Empty Page"
        width={217}
        height={132}
        className="block md:hidden"
      />
    </div>
  );
};
