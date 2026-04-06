import type { CommentItemData } from '@/entities/comment/ui/comment-item';

export interface SosoTalkCommentSectionProps {
  comments: CommentItemData[];
  commentCount?: number;
  inputValue?: string;
  inputPlaceholder?: string;
  onChangeInput?: (value: string) => void;
  onSubmitComment?: () => void;
  currentUserName?: string;
  currentUserImageUrl?: string;
  className?: string;
}
