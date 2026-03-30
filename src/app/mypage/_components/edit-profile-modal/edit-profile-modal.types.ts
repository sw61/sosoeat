import type { ChangeEvent } from 'react';

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialEmail?: string;
  initialImageUrl?: string;
  onSubmit?: (data: { name: string; email: string }) => void;
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
}
