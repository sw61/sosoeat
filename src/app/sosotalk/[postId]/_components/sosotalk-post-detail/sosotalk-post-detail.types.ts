export interface SosoTalkPostDetailProps {
  title: string;
  content: string;
  contentCharacterCount?: number;
  imageUrl?: string;
  authorName: string;
  authorImageUrl?: string;
  categoryLabel?: string;
  statusLabel?: string;
  likeCount?: number;
  commentCount?: number;
  createdAt: string;
  createdAtDateTime?: string;
  isAuthor?: boolean;
  onMoreClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onShareClick?: () => void;
}

export interface SosoTalkPostHeaderProps {
  title: string;
  authorName: string;
  authorImageUrl?: string;
  categoryLabel?: string;
  statusLabel?: string;
  createdAt: string;
  createdAtDateTime?: string;
  isAuthor?: boolean;
  onMoreClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export interface SosoTalkPostBodyProps {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface SosoTalkPostActionsProps {
  contentCharacterCount?: number;
  likeCount?: number;
  commentCount?: number;
  onShareClick?: () => void;
}
