'use client';

import { useRef, useState } from 'react';

import {
  useCreateSosoTalkComment,
  useDeleteSosoTalkComment,
  useUpdateSosoTalkComment,
} from '@/entities/post';
import type { Comment } from '@/shared/types/generated-client/models/Comment';

interface UseSosoTalkPostDetailCommentActionsParams {
  comments: Comment[];
  isValidPostId: boolean;
  postId: number;
}

export function useSosoTalkPostDetailCommentActions({
  comments,
  isValidPostId,
  postId,
}: UseSosoTalkPostDetailCommentActionsParams) {
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentInput, setEditingCommentInput] = useState('');
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const createCommentMutation = useCreateSosoTalkComment();
  const updateCommentMutation = useUpdateSosoTalkComment();
  const deleteCommentMutation = useDeleteSosoTalkComment();

  const isEditingCommentMissing =
    editingCommentId != null && !comments.some((comment) => comment.id === editingCommentId);

  const handleCommentClick = () => {
    commentSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleSubmitComment = async () => {
    const trimmedComment = commentInput.trim();

    if (!isValidPostId || !trimmedComment || createCommentMutation.isPending) {
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        postId,
        payload: {
          content: trimmedComment,
        },
      });
      setCommentInput('');
    } catch {
      // Keep the current input so the user can retry.
    }
  };

  const handleStartEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentInput(comment.content);
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentInput('');
  };

  const handleSubmitEditComment = async () => {
    const trimmedComment = editingCommentInput.trim();

    if (
      !isValidPostId ||
      editingCommentId == null ||
      !trimmedComment ||
      updateCommentMutation.isPending ||
      isEditingCommentMissing
    ) {
      return;
    }

    try {
      await updateCommentMutation.mutateAsync({
        postId,
        commentId: editingCommentId,
        payload: {
          content: trimmedComment,
        },
      });
      handleCancelEditComment();
    } catch {
      // Keep the current input so the user can retry.
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!isValidPostId || deleteCommentMutation.isPending || typeof window === 'undefined') {
      return;
    }

    const shouldDelete = window.confirm('댓글을 삭제할까요?');
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteCommentMutation.mutateAsync({
        postId,
        commentId,
      });

      if (editingCommentId === commentId) {
        handleCancelEditComment();
      }
    } catch {
      // Keep the current screen so the user can retry.
    }
  };

  return {
    commentSectionRef,
    commentInput,
    editingCommentId,
    editingCommentInput,
    isEditPending: updateCommentMutation.isPending,
    setCommentInput,
    setEditingCommentInput,
    handleCancelEditComment,
    handleCommentClick,
    handleDeleteComment,
    handleStartEditComment,
    handleSubmitComment,
    handleSubmitEditComment,
  };
}
