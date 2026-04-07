import type { ChangeEventHandler, ComponentType, RefObject } from 'react';

import type { ActiveFormatKey, ActiveFormats } from './sosotalk-post-editor.internal-types';

export type PostEditorToolbarAction = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  command?: string;
  value?: string;
  isImage?: boolean;
  activeKey?: ActiveFormatKey;
};

export interface PostEditorToolbarProps {
  activeFormats: ActiveFormats;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onImageChange: ChangeEventHandler<HTMLInputElement>;
  onToolbarAction: (command?: string, value?: string, isImage?: boolean) => void;
}
