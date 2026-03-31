import { AlignCenter, Bold, ImagePlus, Italic, List, ListOrdered, Underline } from 'lucide-react';

import type { PostEditorToolbarAction } from './post-editor-toolbar.types';

export const POST_EDITOR_TOOLBAR_ACTIONS: PostEditorToolbarAction[] = [
  { label: '굵게', icon: Bold, command: 'bold', activeKey: 'bold' },
  { label: '기울임', icon: Italic, command: 'italic', activeKey: 'italic' },
  { label: '밑줄', icon: Underline, command: 'underline', activeKey: 'underline' },
  { label: '가운데 정렬', icon: AlignCenter, command: 'justifyCenter', activeKey: 'alignCenter' },
  { label: '목록', icon: List, command: 'insertUnorderedList', activeKey: 'unorderedList' },
  { label: '번호 목록', icon: ListOrdered, command: 'insertOrderedList', activeKey: 'orderedList' },
  { label: '이미지 추가', icon: ImagePlus, isImage: true },
];
