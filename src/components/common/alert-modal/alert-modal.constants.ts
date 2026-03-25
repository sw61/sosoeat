/** 모달 콘텐츠 크기 */
export const ALERT_MODAL_CONTENT_CLASS =
  'transition-all duration-100 flex h-[188px] w-[343px] max-w-[343px] flex-col items-center justify-center gap-0 rounded-[24px] p-0 md:h-[280px] md:min-w-[560px] md:rounded-[40px] gap-0 ' +
  '[&>[data-slot=dialog-close]]:!right-[25.5px] md:[&>[data-slot=dialog-close]]:!right-[40px] ' +
  '[&>[data-slot=dialog-close]]:!top-[25.5px] md:[&>[data-slot=dialog-close]]:!top-[40px] ' +
  '[&>[data-slot=dialog-close]]:!text-sosoeat-gray-700 ' +
  '[&>[data-slot=dialog-close]]:!w-6 [&>[data-slot=dialog-close]]:!h-6 ' +
  '[&>[data-slot=dialog-close]>svg]:!w-6 [&>[data-slot=dialog-close]>svg]:!h-6';

/** 모달 하단 버튼 공통 크기 및 텍스트 스타일 */
export const ALERT_MODAL_BTN_BASE_CLASS =
  'transition-all duration-100 font-semibold text-sm md:text-xl h-10 w-[140px] rounded-[10px] md:h-[60px] md:w-[232px] md:rounded-[16px]';
