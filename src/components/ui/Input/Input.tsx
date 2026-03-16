'use client';

import { forwardRef, useCallback, useId, useState } from 'react';

import type { InputProps } from './Input.types';

/**
 * Input 공통 UI 컴포넌트
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      rightAddon,
      required,
      id: idProp,
      onFocus,
      onBlur,
      className = '',
      ...restInputProps
    },
    ref
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    // 포커스, 에러 상태에 따른 테두리 색상
    const borderClass = errorMessage
      ? 'border-red-500'
      : isFocused
        ? 'border-sosoeat-orange-500'
        : 'border-sosoeat-gray-300';

    return (
      <div className="flex flex-col gap-1.5">
        {/* label */}
        {label && (
          <label htmlFor={id} className="text-sosoeat-gray-900 text-sm">
            {label}
            {required && (
              <span className="ml-0.5 text-red-500" aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </label>
        )}

        {/* input field */}
        <div
          className={`flex items-center rounded-md border bg-white transition-[border-color,box-shadow] duration-200 ease-in-out ${borderClass}`}
        >
          {/* input */}
          <input
            ref={ref}
            id={id}
            required={required}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? errorId : undefined}
            aria-required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={[
              'h-10 min-w-0 flex-1 bg-transparent px-3.5 text-sm outline-none',
              'text-sosoeat-gray-900',
              'placeholder:text-sosoeat-gray-400',
              'disabled:cursor-not-allowed',
              rightAddon ? 'pr-0' : '',
              className,
            ].join(' ')}
            {...restInputProps}
          />

          {/* 오른쪽 Addon (눈 아이콘) */}
          {rightAddon && (
            <span className="text-sosoeat-gray-800 flex shrink-0 items-center px-3">
              {rightAddon}
            </span>
          )}
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <p
            id={errorId}
            role="alert"
            className="animate-[feedbackIn_0.2s_ease-out] text-xs text-red-500"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
