'use client';

import { useSosoTalkWritePage } from '../model';

import { SosoTalkPostEditor } from './sosotalk-post-editor';

interface SosoTalkWritePageClientProps {
  editPostId?: number;
  isInvalidEditPostId?: boolean;
}

export function SosoTalkWritePageClient({
  editPostId,
  isInvalidEditPostId = false,
}: SosoTalkWritePageClientProps) {
  const {
    data,
    isEditMode,
    isError,
    isLoading,
    isSubmitting,
    handleCreateSubmit,
    handleEditSubmit,
  } = useSosoTalkWritePage({
    editPostId,
  });

  if (isInvalidEditPostId) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">올바르지 않은 게시글입니다.</div>
    );
  }

  if (!isEditMode) {
    return (
      <SosoTalkPostEditor
        isSubmitting={isSubmitting}
        onSubmit={(payload) => void handleCreateSubmit(payload)}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        게시글 정보를 불러오는 중이에요.
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        수정할 게시글 정보를 불러오지 못했어요.
      </div>
    );
  }

  return (
    <SosoTalkPostEditor
      initialTitle={data.title}
      initialContent={data.content}
      initialImageUrl={data.image || ''}
      submitLabel="수정"
      isSubmitting={isSubmitting}
      onSubmit={(payload) => void handleEditSubmit(payload)}
    />
  );
}
