'use client';

import { useLayoutEffect, useRef } from 'react';

import { Send } from 'lucide-react';

import { toHttpsUrl } from '../../lib/to-https-url';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Button } from '../button';
import { Textarea } from '../textarea';

import type { CommentInputProps } from './comment-input.types';

export function CommentInput({
  value = '',
  placeholder = '댓글을 입력해 주세요.',
  onChange,
  onSubmit,
  disabled = false,
  submitLabel = '댓글 전송',
  currentUserName = '사용자',
  currentUserImageUrl,
  showAvatar = true,
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
    <div className={cn('flex items-start gap-3 sm:gap-4', className)}>
      {showAvatar ? (
        <Avatar size="default" className="h-[54px] w-[54px] shrink-0">
          <AvatarImage src={toHttpsUrl(currentUserImageUrl)} alt={currentUserName} />
          <AvatarFallback className="text-sm font-semibold">
            {currentUserName.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      ) : null}

      <div className="bg-sosoeat-gray-300 flex min-h-[46px] min-w-0 flex-1 items-end gap-3 rounded-[24px] py-2 pr-[14px] pl-5 sm:pl-6">
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
          className="text-sosoeat-gray-900 placeholder:text-sosoeat-gray-700 max-h-40 min-h-[23px] flex-1 resize-none overflow-hidden border-0 bg-transparent px-0 py-1.5 text-base font-normal shadow-none focus-visible:ring-0 md:text-base"
        />

        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={submitLabel}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className="text-sosoeat-orange-500 hover:text-sosoeat-orange-600 disabled:text-sosoeat-gray-400 mb-0.5 size-9 shrink-0 self-end rounded-full bg-white p-0 shadow-sm transition-[transform,color,background-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:translate-y-0 active:scale-95 disabled:rounded-none disabled:bg-transparent disabled:shadow-none"
        >
          <Send className="size-5 -translate-x-px fill-current" />
        </Button>
      </div>
    </div>
  );
}
