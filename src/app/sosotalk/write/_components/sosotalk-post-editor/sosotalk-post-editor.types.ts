export interface SosoTalkPostSubmitPayload {
  title: string;
  contentHtml: string;
  contentText: string;
  imageFile: File | null;
  displayImageUrl: string;
}

export interface SosoTalkPostEditorProps {
  className?: string;
  initialTitle?: string;
  initialContent?: string;
  initialImageUrl?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit?: (payload: SosoTalkPostSubmitPayload) => void;
}
