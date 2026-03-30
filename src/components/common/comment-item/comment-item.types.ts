export interface CommentItemData {
  id: string;
  authorName: string;
  authorImageUrl?: string;
  createdAt: string;
  relativeTime?: string;
  content: string;
  isAuthorComment?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export interface CommentItemProps extends Omit<CommentItemData, 'id'> {
  className?: string;
}
