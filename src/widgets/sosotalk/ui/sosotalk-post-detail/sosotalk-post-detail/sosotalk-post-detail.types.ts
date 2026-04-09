import type { SosoTalkCommentItemData } from '../../sosotalk-comment-section/sosotalk-comment-section.types';

export interface SosoTalkPostDetailProps {
  title: string;
  contentHtml: string;
  imageUrl?: string;
  authorName: string;
  authorImageUrl?: string;
  likeCount?: number;
  commentCount?: number;
  createdAt: string;
  createdAtDateTime?: string;
  createdDateLabel?: string;
  viewCount?: number;
  isAuthor?: boolean;
  isLiked?: boolean;
  isLikePending?: boolean;
  onMoreClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onLikeClick?: () => void;
  onCommentClick?: () => void;
  onShareClick?: () => void | Promise<void>;
  comments?: SosoTalkCommentItemData[];
  inputValue?: string;
  inputPlaceholder?: string;
  onChangeInput?: (value: string) => void;
  onSubmitComment?: () => void;
  currentUserName?: string;
  currentUserImageUrl?: string;
}

export interface SosoTalkPostHeaderProps {
  title: string;
  authorName: string;
  authorImageUrl?: string;
  createdAt: string;
  createdAtDateTime?: string;
  isAuthor?: boolean;
  onMoreClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export interface SosoTalkPostBodyProps {
  title: string;
  contentHtml: string;
  imageUrl?: string;
}

export interface SosoTalkPostActionsProps {
  createdDateLabel?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  isLikePending?: boolean;
  onLikeClick?: () => void;
  onCommentClick?: () => void;
  onShareClick?: () => void | Promise<void>;
}
