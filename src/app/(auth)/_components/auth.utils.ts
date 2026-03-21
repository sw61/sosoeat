import { cn } from '@/lib/utils';

/**
 * 에러 메시지 노출 시 사용되는 그리드 애니메이션 클래스를 반환합니다.
 * 높이가 늘어나면서(Grid) 아래에서 위로(Translate) 부드럽게 나타납니다.
 *
 * @param {boolean} hasError - 에러 존재 여부
 * @returns {string} Tailwind CSS 클래스 문자열
 */
export const getErrorAnimationClasses = (hasError: boolean = false) =>
  cn(
    'grid transition-all duration-300 ease-in-out',
    hasError
      ? 'translate-y-0 grid-rows-[1fr] opacity-100'
      : 'translate-y-2 grid-rows-[0fr] opacity-0'
  );

/**
 * 인증 관련 Input 컴포넌트에 공통으로 적용되는 클래스를 반환합니다.
 * 디자인 가이드에 따른 배경색, 포커스 색상, 라운드값을 포함합니다.
 *
 * @param {boolean} hasError - 에러 존재 여부
 * @param {string} className - 추가적으로 적용할 클래스
 * @returns {string} Tailwind CSS 클래스 문자열
 */
export const getInputClasses = (hasError: boolean = false, className?: string) =>
  cn(
    // 기본 스타일: 높이, 라운드, 배경, 텍스트 크기 등
    'bg-sosoeat-gray-100 h-12 w-full rounded-[14px] px-4 text-sm transition-all duration-300 md:text-base',
    'placeholder:text-sosoeat-gray-500 font-normal outline-none',
    // 포커스 스타일: 테두리 강조 및 링 제거
    'focus:border-sosoeat-orange-600 border border-transparent focus:ring-0 focus-visible:ring-0 aria-invalid:ring-0',
    // 에러 스타일
    hasError && 'border-destructive focus:border-destructive',
    className
  );

/**
 * 인증 관련 필드의 에러를 표시할지 여부를 결정하는 헬퍼 함수입니다.
 *
 * @param {object} error - React Hook Form의 필드 에러 객체
 * @param {boolean} isTouched - 해당 필드가 터치되었는지 여부
 * @param {boolean} isSubmitted - 폼이 제출되었는지 여부
 * @param {string} value - 현재 필드의 값 (watch 값)
 * @returns {object | undefined} 표시할 에러 객체 또는 undefined
 */
export const getAuthFieldError = (
  error?: { message?: string },
  isTouched: boolean = false,
  isSubmitted: boolean = false,
  value?: string
) => {
  // 노출 조건: (제출되었거나 필드에서 포커스가 나갔을 때) && 에러가 존재함 && 값이 비어있지 않음
  if ((isSubmitted || isTouched) && error && !!value) {
    return error;
  }
  return undefined;
};
