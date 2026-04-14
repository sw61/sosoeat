import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import type { GetSosoTalkPostDetailResponse, SosoTalkComment } from '@/entities/post';
import type { SosoTalkCommentItemData } from '@/entities/sosotalk-comment';

const SOSOTALK_AUTHOR_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop';

interface MapCommentToCommentItemDataOptions {
  currentUserId?: number;
  editingCommentId: number | null;
  editingCommentInput: string;
  isEditPending: boolean;
  onEditClick: (comment: SosoTalkComment) => void;
  onDeleteClick: (comment: SosoTalkComment) => void;
  onLikeClick: (comment: SosoTalkComment) => void;
  onEditValueChange: (value: string) => void;
  onEditSubmit: () => void;
  onEditCancel: () => void;
}

export function mapCommentToCommentItemData(
  comment: SosoTalkComment,
  {
    currentUserId,
    editingCommentId,
    editingCommentInput,
    isEditPending,
    onEditClick,
    onDeleteClick,
    onLikeClick,
    onEditValueChange,
    onEditSubmit,
    onEditCancel,
  }: MapCommentToCommentItemDataOptions
): SosoTalkCommentItemData {
  return {
    id: String(comment.id),
    authorName: comment.author.name,
    authorImageUrl: comment.author.image || SOSOTALK_AUTHOR_IMAGE_FALLBACK,
    createdAt: format(comment.createdAt, 'M월 d일 HH:mm', { locale: ko }),
    relativeTime: formatSosoTalkRelativeTime(comment.createdAt),
    content: comment.content,
    isAuthorComment: currentUserId === comment.author.id,
    isMine: currentUserId === comment.author.id,
    isLiked: comment.isLiked,
    likeCount: comment.likeCount,
    isEditing: editingCommentId === comment.id,
    editValue: editingCommentId === comment.id ? editingCommentInput : comment.content,
    isEditPending,
    onEditClick: () => onEditClick(comment),
    onDeleteClick: () => onDeleteClick(comment),
    onLikeClick: () => onLikeClick(comment),
    onEditValueChange,
    onEditSubmit,
    onEditCancel,
  };
}

export function formatSosoTalkRelativeTime(createdAt: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - createdAt.getTime();

  if (diffMs < 60_000) {
    return '방금 전';
  }

  const diffMinutes = Math.floor(diffMs / 60_000);
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.floor(diffMs / 3_600_000);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffMs / 86_400_000);
  return `${diffDays}일 전`;
}

export function getSosoTalkCommentCount(data?: GetSosoTalkPostDetailResponse) {
  return data?.count?.comments ?? data?.comments?.length ?? 0;
}

export function getSosoTalkComments(data?: GetSosoTalkPostDetailResponse) {
  return data?.comments ?? [];
}

export function getSosoTalkLikeState(
  data: GetSosoTalkPostDetailResponse | undefined,
  optimisticIsLiked: boolean | null,
  isLikePending: boolean
) {
  const serverIsLiked = data?.isLiked ?? false;
  const shouldUseOptimisticLike =
    optimisticIsLiked != null && (isLikePending || serverIsLiked !== optimisticIsLiked);
  const isLiked = shouldUseOptimisticLike ? optimisticIsLiked : serverIsLiked;
  const displayedLikeCount = (data?.likeCount ?? 0) + (isLiked ? 1 : 0) - (serverIsLiked ? 1 : 0);

  return {
    displayedLikeCount,
    isLiked,
    serverIsLiked,
  };
}

export { SOSOTALK_AUTHOR_IMAGE_FALLBACK };
