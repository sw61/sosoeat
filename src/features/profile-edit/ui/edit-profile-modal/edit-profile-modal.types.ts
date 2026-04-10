import type { ChangeEvent } from 'react';

import type { User } from '@/shared/types/generated-client';

export interface EditProfileModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialName?: string;

  initialImageUrl?: string;
  onSuccess?: (user: User) => void;
}

export interface ProfileFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ProfileImageEditorProps {
  imageUrl?: string;
  onChange: (url: string) => void;
}
