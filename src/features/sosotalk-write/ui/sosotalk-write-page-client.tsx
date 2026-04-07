'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  uploadSosoTalkPostImage,
  useCreateSosoTalkPost,
  useGetSosoTalkPostDetail,
  useUpdateSosoTalkPost,
} from '@/entities/post';

import type { SosoTalkPostSubmitPayload } from '../model';

import { SosoTalkPostEditor } from './sosotalk-post-editor';

interface SosoTalkWritePageClientProps {
  editPostId?: number;
}

export function SosoTalkWritePageClient({ editPostId }: SosoTalkWritePageClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = editPostId != null;
  const { data, isLoading, isError } = useGetSosoTalkPostDetail(editPostId);
  const createPostMutation = useCreateSosoTalkPost();
  const updatePostMutation = useUpdateSosoTalkPost();

  const resolveCreateImageUrl = async (
    payload: SosoTalkPostSubmitPayload
  ): Promise<string | undefined> => {
    if (payload.imageFile) {
      return uploadSosoTalkPostImage(payload.imageFile);
    }

    return payload.displayImageUrl || undefined;
  };

  const resolveUpdateImageValue = async (payload: SosoTalkPostSubmitPayload): Promise<string> => {
    if (payload.imageFile) {
      return uploadSosoTalkPostImage(payload.imageFile);
    }

    // Keep the explicit empty string so the server can distinguish
    // "remove image" from "field omitted".
    return payload.displayImageUrl;
  };

  const handleCreateSubmit = async (payload: SosoTalkPostSubmitPayload) => {
    if (isSubmitting || createPostMutation.isPending) {
      return;
    }

    setIsSubmitting(true);

    try {
      const image = await resolveCreateImageUrl(payload);
      const createdPost = await createPostMutation.mutateAsync({
        payload: {
          title: payload.title,
          content: payload.contentHtml,
          image,
        },
      });

      router.push(`/sosotalk/${createdPost.id}`);
    } catch {
      // 작성 실패 시 입력한 값을 유지한 채 다시 시도할 수 있도록 둡니다.
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (payload: SosoTalkPostSubmitPayload) => {
    if (editPostId == null || editPostId <= 0 || isSubmitting || updatePostMutation.isPending) {
      return;
    }

    setIsSubmitting(true);

    try {
      const image = await resolveUpdateImageValue(payload);

      await updatePostMutation.mutateAsync({
        postId: editPostId,
        payload: {
          title: payload.title,
          content: payload.contentHtml,
          image,
        },
      });

      router.push(`/sosotalk/${editPostId}`);
    } catch {
      // 수정 실패 시 입력한 값을 유지한 채 다시 시도할 수 있도록 둡니다.
    } finally {
      setIsSubmitting(false);
    }
  };

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
