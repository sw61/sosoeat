export interface SosoTalkCommentItemData {
  id: string;
  authorName: string;
  authorImageUrl?: string;
  createdAt: string;
  relativeTime?: string;
  content: string;
  isAuthorComment?: boolean;
  isMine?: boolean;
  isLiked?: boolean;
  likeCount?: number;
  isEditing?: boolean;
  editValue?: string;
  isEditPending?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onLikeClick?: () => void;
  onEditValueChange?: (value: string) => void;
  onEditSubmit?: () => void;
  onEditCancel?: () => void;
}

export interface SosoTalkCommentItemProps extends Omit<SosoTalkCommentItemData, 'id'> {
  className?: string;
}
