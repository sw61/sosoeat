'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import {
  uploadSosoTalkPostImage,
  useCreateSosoTalkPost,
  useGetSosoTalkPostDetail,
  useUpdateSosoTalkPost,
} from '@/entities/post';
import { capture5xxException } from '@/shared/lib/sentry-error';

import type { SosoTalkPostSubmitPayload } from './sosotalk-post-editor.types';

interface UseSosoTalkWritePageParams {
  editPostId?: number;
}

const hasRequiredImage = (payload: SosoTalkPostSubmitPayload) =>
  payload.imageFile != null || payload.displayImageUrl.trim().length > 0;

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

  return payload.displayImageUrl;
};

export function useSosoTalkWritePage({ editPostId }: UseSosoTalkWritePageParams) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = editPostId != null;
  const { data, isLoading, isError } = useGetSosoTalkPostDetail(editPostId);
  const createPostMutation = useCreateSosoTalkPost();
  const updatePostMutation = useUpdateSosoTalkPost();

  const handleCreateSubmit = async (payload: SosoTalkPostSubmitPayload) => {
    if (isSubmitting || createPostMutation.isPending) {
      return;
    }

    if (!hasRequiredImage(payload)) {
      toast.error('이미지는 필수입니다.');
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

      router.replace(`/sosotalk/${createdPost.id}`);
    } catch (error) {
      capture5xxException(error, {
        tags: {
          area: 'sosotalk-write',
          action: 'create-post',
        },
      });
      toast.error('게시글 등록 중 문제가 생겼어요. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (payload: SosoTalkPostSubmitPayload) => {
    if (editPostId == null || editPostId <= 0 || isSubmitting || updatePostMutation.isPending) {
      return;
    }

    if (!hasRequiredImage(payload)) {
      toast.error('이미지는 필수입니다.');
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

      router.replace(`/sosotalk/${editPostId}`);
    } catch (error) {
      capture5xxException(error, {
        tags: {
          area: 'sosotalk-write',
          action: 'update-post',
        },
        extra: {
          postId: editPostId,
        },
      });
      toast.error('게시글 수정 중 문제가 생겼어요. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    isEditMode,
    isError,
    isLoading,
    isSubmitting,
    handleCreateSubmit,
    handleEditSubmit,
  };
}
