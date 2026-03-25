import type { ComponentType, ReactNode } from 'react';

import { Heart, MessageCircle, Share2 } from 'lucide-react';

import type { SosoTalkPostActionsProps } from './sosotalk-post-detail.types';

export function SosoTalkPostDetailActions({
  contentCharacterCount,
  likeCount = 0,
  commentCount = 0,
  onShareClick,
}: SosoTalkPostActionsProps) {
  return (
    <div
      className={`border-sosoeat-gray-300 flex items-center gap-4 border-t pt-4 ${
        typeof contentCharacterCount === 'number' ? 'justify-between' : 'justify-end'
      }`}
    >
      {typeof contentCharacterCount === 'number' ? (
        <div className="text-sosoeat-gray-500 text-sm font-medium md:text-base">
          {contentCharacterCount}자
        </div>
      ) : null}

      <div className="flex items-center gap-4 md:gap-6">
        <PostMetaItem icon={Heart} label="좋아요" value={likeCount} />
        <PostMetaItem icon={MessageCircle} label="댓글" value={commentCount} />
        <ActionIcon
          className="text-sosoeat-gray-900 hover:text-sosoeat-orange-600 inline-flex"
          label="공유"
          onClick={onShareClick}
        >
          <Share2 className="h-6 w-6" />
        </ActionIcon>
      </div>
    </div>
  );
}

interface PostMetaItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
}

function PostMetaItem({ icon: Icon, label, value }: PostMetaItemProps) {
  return (
    <span
      className="text-sosoeat-gray-900 inline-flex items-center gap-2"
      aria-label={`${label} ${value}개`}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <span>{value}</span>
    </span>
  );
}

interface ActionIconProps {
  children: ReactNode;
  className: string;
  label: string;
  onClick?: () => void;
}

function ActionIcon({ children, className, label, onClick }: ActionIconProps) {
  const baseClassName =
    'h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors';

  if (!onClick) {
    return (
      <span className={`${baseClassName} ${className}`} aria-hidden="true">
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClassName} ${className}`}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
