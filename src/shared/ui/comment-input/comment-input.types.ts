export interface CommentInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
  submitLabel?: string;
  currentUserName?: string;
  currentUserImageUrl?: string;
  showAvatar?: boolean;
  submitOnEnter?: boolean;
  className?: string;
}
