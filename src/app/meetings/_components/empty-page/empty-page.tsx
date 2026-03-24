import Image from 'next/image';

import { cn } from '@/lib/utils';

/** 뷰포트별 상단 여백 — Jest에서 클래스 포함 여부로 검증 */
export const EMPTY_PAGE_MARGIN_CLASSES = 'mt-[200px] min-[375px]:mt-[145px] min-[744px]:mt-[180px]';

export const EmptyPage = () => {
  return (
    <div
      data-testid="empty-page-root"
      className={cn(EMPTY_PAGE_MARGIN_CLASSES, 'flex h-full flex-col items-center justify-center')}
    >
      <Image src="/images/empty-page.svg" alt="Empty Page" width={100} height={100} />
    </div>
  );
};
