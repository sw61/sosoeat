'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ImageUploadField } from './_components/image-upload-field';
import { PostEditorToolbar } from './_components/post-editor-toolbar';
import { useSosoTalkPostEditor } from './hooks/use-sosotalk-post-editor';
import {
  SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH,
  SOSOTALK_POST_EDITOR_MIN_HEIGHT,
  SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH,
} from './sosotalk-post-editor.constants';
import type { SosoTalkPostEditorProps } from './sosotalk-post-editor.types';

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
        <PostEditorToolbar
          activeFormats={activeFormats}
          fileInputRef={fileInputRef}
          onImageChange={handleImageChange}
          onToolbarAction={handleToolbarAction}
        />

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
