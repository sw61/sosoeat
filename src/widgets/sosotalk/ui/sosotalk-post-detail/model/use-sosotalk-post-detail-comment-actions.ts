'use client';

import { useRef, useState } from 'react';

import { toast } from 'sonner';

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
  const [pendingDeleteCommentId, setPendingDeleteCommentId] = useState<number | null>(null);
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
      toast.error('댓글 등록 중 문제가 생겼어요. 다시 시도해 주세요.');
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
      toast.error('댓글 수정 중 문제가 생겼어요. 다시 시도해 주세요.');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    if (!isValidPostId || deleteCommentMutation.isPending) {
      return;
    }

    setPendingDeleteCommentId(commentId);
  };

  const handleCancelDeleteComment = () => {
    setPendingDeleteCommentId(null);
  };

  const handleConfirmDeleteComment = async () => {
    if (!isValidPostId || deleteCommentMutation.isPending || pendingDeleteCommentId == null) {
      return;
    }

    try {
      await deleteCommentMutation.mutateAsync({
        postId,
        commentId: pendingDeleteCommentId,
      });

      if (editingCommentId === pendingDeleteCommentId) {
        handleCancelEditComment();
      }

      setPendingDeleteCommentId(null);
    } catch {
      toast.error('댓글 삭제 중 문제가 생겼어요. 다시 시도해 주세요.');
    }
  };

  return {
    commentSectionRef,
    commentInput,
    editingCommentId,
    editingCommentInput,
    pendingDeleteCommentId,
    isEditPending: updateCommentMutation.isPending,
    setCommentInput,
    setEditingCommentInput,
    handleCancelEditComment,
    handleCancelDeleteComment,
    handleCommentClick,
    handleConfirmDeleteComment,
    handleDeleteComment,
    handleStartEditComment,
    handleSubmitComment,
    handleSubmitEditComment,
  };
}
