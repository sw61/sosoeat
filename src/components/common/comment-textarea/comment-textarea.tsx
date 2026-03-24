'use client';

import { useEffect, useRef, useState } from 'react';

import { SendHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';

interface AutoResizeInputProps extends Omit<React.ComponentProps<'textarea'>, 'onSubmit'> {
  onSubmit?: (value: string) => void;
}

// 높이 조절
function useAutoResize(value: string) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return textareaRef;
}

export function CommentTextarea({ onSubmit, ...props }: AutoResizeInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useAutoResize(value);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value);
    setValue('');
  };

  // Shift + Enter는 줄바꿈, 그냥 Enter는 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        'bg-sosoeat-gray-300 focus-within:border-sosoeat-orange-500 flex items-end rounded-4xl p-2 ring-0',
        'lg:w-293',
        'max-lg:w-148.25',
        'max-md:w-69'
      )}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 resize-none overflow-hidden bg-transparent px-2 py-1 outline-none"
        {...props}
      />
      <button
        onClick={handleSubmit}
        className={cn(
          'border-sosoeat-orange-500 flex rotate-320 items-center justify-center rounded-full bg-white p-1 text-orange-500 ring-0',
          'max-lg:h-8 max-lg:w-8 lg:h-9 lg:w-9'
        )}
      >
        <SendHorizontal className="max-lg:size-5 lg:size-7" />
      </button>
    </div>
  );
}
