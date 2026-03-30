'use client';

import { cn } from '@/lib/utils';

import { SOSOTALK_POST_EDITOR_ACCEPTED_IMAGE_TYPES } from '../../sosotalk-post-editor.constants';

import { POST_EDITOR_TOOLBAR_ACTIONS } from './post-editor-toolbar.constants';
import type { PostEditorToolbarProps } from './post-editor-toolbar.types';

export function PostEditorToolbar({
  activeFormats,
  fileInputRef,
  onImageChange,
  onToolbarAction,
}: PostEditorToolbarProps) {
  return (
    <div className="bg-sosoeat-gray-200 rounded-[18px] px-2 py-2 md:rounded-[22px] md:px-4 md:py-2.5">
      <div className="grid grid-cols-7 items-center gap-0.5 md:gap-1">
        {POST_EDITOR_TOOLBAR_ACTIONS.map((action) => {
          const Icon = action.icon;
          const isActive = action.activeKey ? activeFormats[action.activeKey] : false;

          return (
            <button
              key={action.label}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onToolbarAction(action.command, action.value, action.isImage)}
              className={cn(
                'flex h-7 w-full items-center justify-center rounded-full transition-colors md:h-9',
                isActive
                  ? 'bg-white text-orange-600 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                  : 'text-sosoeat-gray-600 hover:bg-white hover:text-orange-600'
              )}
              aria-label={action.label}
              aria-pressed={isActive}
            >
              <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            </button>
          );
        })}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={SOSOTALK_POST_EDITOR_ACCEPTED_IMAGE_TYPES}
        className="hidden"
        onChange={onImageChange}
      />
    </div>
  );
}
