import type { CommentItemData } from '@/components/common/comment-item';

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
