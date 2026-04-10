'use client';

import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/auth';
import {
  useCreateComment,
  useDeleteComment,
  useLikeComment,
  useUpdateComment,
} from '@/features/meeting-comment';
import { useModal } from '@/shared/lib/use-modal';

interface UseMeetingCommentItemProps {
  commentId: number;
  meetingId: number;
  content: string;
  isLiked: boolean;
  likeCount: number;
}

export function useMeetingCommentItem({
  commentId,
  meetingId,
  content,
  isLiked,
  likeCount,
}: UseMeetingCommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [prevServerLike, setPrevServerLike] = useState({ isLiked, likeCount });
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isOpen: isDeleteModalOpen, open: openDeleteModal, close: closeDeleteModal } = useModal();

  // 서버 데이터 변경 시 렌더 중 동기화 (useEffect 대신 React 권장 파생 상태 패턴)
  if (prevServerLike.isLiked !== isLiked || prevServerLike.likeCount !== likeCount) {
    setPrevServerLike({ isLiked, likeCount });
    setLocalIsLiked(isLiked);
    setLocalLikeCount(likeCount);
  }

  const { user } = useAuthStore();
  const { mutate: likeComment } = useLikeComment(meetingId);
  const { mutate: updateComment } = useUpdateComment(meetingId);
  const { mutate: deleteComment } = useDeleteComment(meetingId);
  const { mutate: createComment } = useCreateComment(meetingId, {
    nickname: user?.name ?? '',
    profileUrl: user?.image ?? null,
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleLike = () => {
    const nextIsLiked = !localIsLiked;
    setLocalIsLiked(nextIsLiked);
    setLocalLikeCount((prev) => (nextIsLiked ? prev + 1 : prev - 1));

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (nextIsLiked === prevServerLike.isLiked) return;

      likeComment(
        { commentId, isLiked: localIsLiked },
        {
          onError: () => {
            setLocalIsLiked(isLiked);
            setLocalLikeCount(likeCount);
          },
        }
      );
    }, 300);
  };

  const handleEditSubmit = () => {
    if (!editText.trim() || editText === content) {
      setIsEditing(false);
      return;
    }
    updateComment(
      { commentId, payload: { content: editText.trim() } },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleDelete = () => {
    deleteComment(commentId, {
      onSuccess: closeDeleteModal,
    });
  };

  const handleToggleReplying = () => {
    if (isReplying) {
      setReplyText('');
    }
    setIsReplying((prev) => !prev);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    const savedText = replyText;
    setIsReplying(false);
    setReplyText('');
    createComment(
      { content: savedText, parentId: commentId },
      {
        onError: () => {
          setIsReplying(true);
          setReplyText(savedText);
        },
      }
    );
  };

  return {
    isEditing,
    setIsEditing,
    editText,
    setEditText,
    isReplying,
    setIsReplying,
    replyText,
    setReplyText,
    localIsLiked,
    localLikeCount,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleLike,
    handleEditSubmit,
    handleDelete,
    handleToggleReplying,
    handleCancelReply,
    handleReplySubmit,
  };
}
