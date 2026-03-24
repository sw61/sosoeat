export interface CommentItemData {
  id: string;
  authorName: string;
  authorImageUrl?: string;
  createdAt: string;
  relativeTime?: string;
  content: string;
  isAuthorComment?: boolean;
}

export interface CommentItemProps extends Omit<CommentItemData, 'id'> {
  className?: string;
}
