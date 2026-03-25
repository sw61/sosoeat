'use client';

import { useLayoutEffect, useRef } from 'react';

import { Send } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import type { CommentInputProps } from './comment-input.types';

export function CommentInput({
  value = '',
  placeholder = '댓글을 입력하세요.',
  onChange,
  onSubmit,
  disabled = false,
  submitLabel = '댓글 전송',
  currentUserName = '사용자',
  currentUserImageUrl,
  submitOnEnter = true,
  className,
}: CommentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = '0px';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const isSubmitDisabled = disabled || value.trim().length === 0;

  const handleSubmit = () => {
    if (isSubmitDisabled) {
      return;
    }

    onSubmit?.();
  };

  return (
    <div className={cn('flex items-center gap-3 sm:gap-4', className)}>
      <Avatar size="default" className="h-[54px] w-[54px] shrink-0">
        <AvatarImage src={currentUserImageUrl} alt={currentUserName} />
        <AvatarFallback className="text-sm font-semibold">
          {currentUserName.slice(0, 1)}
        </AvatarFallback>
      </Avatar>

      <div className="bg-sosoeat-gray-300 flex min-h-[46px] min-w-0 flex-1 items-end gap-3 rounded-[24px] py-2 pr-[14px] pl-5 sm:pr-[14px] sm:pl-6">
        <Textarea
          ref={textareaRef}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          onChange={(event) => onChange?.(event.target.value)}
          onKeyDown={(event) => {
            if (
              !submitOnEnter ||
              event.key !== 'Enter' ||
              event.shiftKey ||
              event.nativeEvent.isComposing
            ) {
              return;
            }

            event.preventDefault();
            handleSubmit();
          }}
          className="text-sosoeat-gray-900 placeholder:text-sosoeat-gray-700 max-h-40 min-h-[23px] flex-1 resize-none border-0 bg-transparent px-0 pt-0 pb-1.5 text-base font-normal shadow-none focus-visible:ring-0 md:text-base"
        />

        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={submitLabel}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className="text-sosoeat-gray-700 hover:text-sosoeat-gray-800 disabled:text-sosoeat-gray-500 mb-0.5 size-9 shrink-0 self-end rounded-none bg-transparent p-0 shadow-none hover:bg-transparent disabled:bg-transparent"
        >
          <Send className="mt-0.5 size-6 fill-current" />
        </Button>
      </div>
    </div>
  );
}
