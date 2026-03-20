import { cn } from '@/lib/utils';

/**
 * 입력 필드의 공통 스타일 클래스를 반환합니다.
 */
export const getInputClasses = (hasError: boolean, className?: string) =>
  cn(
    'bg-sosoeat-gray-200 h-12 rounded-[14px] border border-transparent px-3 text-base font-normal transition-all duration-300 sm:text-sm md:text-base',
    'focus:border-sosoeat-orange-900 focus:outline-none focus-visible:ring-0',
    hasError ? 'border-destructive aria-invalid:ring-0' : '',
    className
  );

/**
 * 에러 메시지 애니메이션을 위한 공통 스타일 클래스를 반환합니다.
 */
export const getErrorAnimationClasses = (hasError: boolean) =>
  cn(
    'ml-1 transform transition-all duration-300',
    hasError ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-95 opacity-0'
  );
