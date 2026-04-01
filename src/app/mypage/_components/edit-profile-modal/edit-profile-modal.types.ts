import type { ChangeEvent } from 'react';

export interface EditProfileModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialName?: string;
  initialEmail?: string;
  initialImageUrl?: string;
  onSubmit?: (data: { name: string; email: string; imageUrl?: string }) => void;
}

export interface ProfileFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export interface ProfileImageEditorProps {
  imageUrl?: string;
  onChange: (url: string) => void;
}
