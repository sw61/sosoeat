import type { SosoTalkCommentItemData } from '@/entities/sosotalk-comment';

export interface SosoTalkCommentSectionProps {
  comments: SosoTalkCommentItemData[];
  commentCount?: number;
  inputValue?: string;
  inputPlaceholder?: string;
  onChangeInput?: (value: string) => void;
  onSubmitComment?: () => void;
  currentUserName?: string;
  currentUserImageUrl?: string;
  className?: string;
}
