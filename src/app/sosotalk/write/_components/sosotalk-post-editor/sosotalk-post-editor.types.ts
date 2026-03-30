export interface SosoTalkPostSubmitPayload {
  title: string;
  contentHtml: string;
  contentText: string;
  imageFile: File | null;
}

export interface SosoTalkPostEditorProps {
  className?: string;
  initialTitle?: string;
  initialContent?: string;
  initialImageUrl?: string;
  submitLabel?: string;
  onSubmit?: (payload: SosoTalkPostSubmitPayload) => void;
}
