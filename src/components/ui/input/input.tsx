import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 기본 스타일
        'bg-sosoeat-gray-100 h-11 w-full min-w-0 rounded-lg border px-2.5 py-1 text-sm transition-colors outline-none',
        'file:text-foreground placeholder:text-sosoeat-gray-600 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3',

        // 포커스 시
        'focus-visible:border-sosoeat-orange-500 focus-visible:ring-0 focus-visible:ring-offset-0',

        // 비활성화 시
        'disabled:bg-input/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

        // 에러 발생 시
        'aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:ring-offset-0',
        className
      )}
      {...props}
    />
  );
}

export { Input };
