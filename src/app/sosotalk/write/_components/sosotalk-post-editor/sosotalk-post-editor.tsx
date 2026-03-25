'use client';

import type { ComponentType } from 'react';

import {
  AlignCenter,
  AlignLeft,
  Bold,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Underline,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ImageUploadField } from './_components/image-upload-field';
import { useSosoTalkPostEditor } from './hooks/use-sosotalk-post-editor';
import {
  SOSOTALK_POST_EDITOR_ACCEPTED_IMAGE_TYPES,
  SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH,
  SOSOTALK_POST_EDITOR_MIN_HEIGHT,
  SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH,
} from './sosotalk-post-editor.constants';
import type { SosoTalkPostEditorProps } from './sosotalk-post-editor.types';

type ActiveKey =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'unorderedList'
  | 'orderedList'
  | 'alignLeft'
  | 'alignCenter';

type ToolbarAction = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  command?: string;
  value?: string;
  isImage?: boolean;
  activeKey?: ActiveKey;
};

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: '굵게', icon: Bold, command: 'bold', activeKey: 'bold' },
  { label: '기울임', icon: Italic, command: 'italic', activeKey: 'italic' },
  { label: '밑줄', icon: Underline, command: 'underline', activeKey: 'underline' },
  { label: '본문', icon: Pilcrow, command: 'formatBlock', value: 'p' },
  { label: '좌측 정렬', icon: AlignLeft, command: 'justifyLeft', activeKey: 'alignLeft' },
  { label: '가운데 정렬', icon: AlignCenter, command: 'justifyCenter', activeKey: 'alignCenter' },
  { label: '목록', icon: List, command: 'insertUnorderedList', activeKey: 'unorderedList' },
  { label: '번호 목록', icon: ListOrdered, command: 'insertOrderedList', activeKey: 'orderedList' },
  { label: '이미지 추가', icon: ImagePlus, isImage: true },
];

export const SosoTalkPostEditor = ({
  className,
  initialTitle = '',
  initialContent = '',
  initialImageUrl = '',
  submitLabel = '등록',
  onSubmit,
}: SosoTalkPostEditorProps) => {
  const {
    activeFormats,
    contentLengthWithoutSpaces,
    contentText,
    editorRef,
    effectiveContentLength,
    fileInputRef,
    handleEditorInput,
    handleImageChange,
    handleImageRemove,
    handleSubmit,
    handleTitleChange,
    handleToolbarAction,
    imageFile,
    imagePreviewUrl,
    isSubmitDisabled,
    syncEditorState,
    title,
  } = useSosoTalkPostEditor({
    initialTitle,
    initialContent,
    initialImageUrl,
    onSubmit,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('mx-auto flex w-full flex-col gap-6 md:gap-8', className)}
    >
      <div className="mx-auto flex w-full max-w-[860px] items-end gap-2 md:gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label htmlFor="sosotalk-post-title" className="sr-only">
            게시글 제목
          </label>
          <input
            id="sosotalk-post-title"
            value={title}
            onChange={handleTitleChange}
            placeholder="게시글 제목을 입력해주세요. (최대 30자)"
            className="border-sosoeat-gray-400 placeholder:text-sosoeat-gray-500 w-full border-b bg-transparent pb-2 text-sm font-semibold outline-none md:text-xl lg:text-3xl"
          />
        </div>

        <span className="text-sosoeat-gray-700 pb-3 text-xs font-semibold md:pb-4 md:text-sm">
          <span className="text-orange-600">{title.length}</span>/
          {SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH}
        </span>

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 h-10 w-14 rounded-[14px] px-0 text-sm font-semibold text-white md:h-[48px] md:w-[80px] md:text-lg"
        >
          {submitLabel}
        </Button>
      </div>

      <div
        className="mx-auto flex w-full max-w-[860px] flex-col rounded-[24px] bg-white px-4 pt-4 pb-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:rounded-[34px] md:px-9 md:pt-9 md:pb-8"
        style={{ minHeight: `${SOSOTALK_POST_EDITOR_MIN_HEIGHT}px` }}
      >
        <div className="bg-sosoeat-gray-200 rounded-[18px] px-2 py-2 md:rounded-[22px] md:px-4 md:py-2.5">
          <div className="grid grid-cols-9 items-center gap-0.5 md:gap-1">
            {TOOLBAR_ACTIONS.map((action) => {
              const Icon = action.icon;
              const isActive = action.activeKey ? activeFormats[action.activeKey] : false;

              return (
                <button
                  key={action.label}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleToolbarAction(action.command, action.value, action.isImage)}
                  className={cn(
                    'flex h-7 w-full items-center justify-center rounded-full transition-colors md:h-9',
                    isActive
                      ? 'bg-white text-orange-600 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                      : 'text-sosoeat-gray-600 hover:bg-white hover:text-orange-600'
                  )}
                  aria-label={action.label}
                  aria-pressed={isActive}
                >
                  <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
                </button>
              );
            })}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={SOSOTALK_POST_EDITOR_ACCEPTED_IMAGE_TYPES}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="relative mt-4 min-h-[360px] flex-1 md:mt-6">
          {!contentText ? (
            <p className="text-sosoeat-gray-600 pointer-events-none absolute top-0 left-0 text-sm font-medium">
              게시글 내용을 입력해주세요. (최대 {SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH}자)
            </p>
          ) : null}

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            onBlur={syncEditorState}
            className={cn(
              'relative min-h-[360px] text-sm font-medium outline-none',
              '[&_ol]:list-decimal [&_ol]:pl-6 [&_p]:min-h-[1.85em] [&_ul]:list-disc [&_ul]:pl-6'
            )}
          />
        </div>

        <div className="mt-auto pt-6 md:pt-10">
          <ImageUploadField
            imageUrl={imagePreviewUrl}
            imageName={imageFile?.name}
            onRemove={handleImageRemove}
          />
          <p className="text-sosoeat-gray-600 mt-8 text-sm">
            공백포함 : 총 {effectiveContentLength}자 | 공백제외 : 총 {contentLengthWithoutSpaces}자
          </p>
        </div>
      </div>
    </form>
  );
};
