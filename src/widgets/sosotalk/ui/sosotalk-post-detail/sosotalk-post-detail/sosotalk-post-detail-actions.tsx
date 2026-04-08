'use client';

import type { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

import type { SosoTalkPostActionsProps } from './sosotalk-post-detail.types';

export function SosoTalkPostDetailActions({
  createdDateLabel,
  viewCount,
  likeCount = 0,
  commentCount = 0,
  isLiked = false,
  onLikeClick,
  onCommentClick,
  onShareClick,
}: SosoTalkPostActionsProps) {
  const hasMeta = Boolean(createdDateLabel) || typeof viewCount === 'number';

  return (
    <div
      className={`border-sosoeat-gray-300 flex items-center gap-4 border-t pt-4 ${
        hasMeta ? 'justify-between' : 'justify-end'
      }`}
    >
      {hasMeta ? (
        <div className="text-sosoeat-gray-500 flex items-center gap-2 text-sm font-medium md:text-base">
          {createdDateLabel ? <span>{createdDateLabel}</span> : null}
          {createdDateLabel && typeof viewCount === 'number' ? <span aria-hidden>|</span> : null}
          {typeof viewCount === 'number' ? (
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4 shrink-0" />
              <span>{viewCount}</span>
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex items-center gap-4 md:gap-6">
        <motion.button
          type="button"
          aria-pressed={isLiked}
          aria-label={`좋아요 ${likeCount}개`}
          onClick={onLikeClick}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          className={`inline-flex items-center gap-2 transition-colors duration-150 ${
            isLiked
              ? 'text-sosoeat-orange-600'
              : 'text-sosoeat-gray-900 hover:text-sosoeat-orange-600'
          }`}
        >
          <motion.span
            animate={
              isLiked
                ? { scale: [1, 1.28, 0.96, 1], rotate: [0, -10, 10, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="inline-flex"
          >
            <Heart className={`h-6 w-6 shrink-0 ${isLiked ? 'fill-current' : ''}`} />
          </motion.span>
          <span>{likeCount}</span>
        </motion.button>

        <button
          type="button"
          aria-label={`댓글 ${commentCount}개`}
          onClick={onCommentClick}
          className="text-sosoeat-gray-900 hover:text-sosoeat-orange-600 inline-flex items-center gap-2 transition-[transform,color] duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        >
          <MessageCircle className="h-6 w-6 shrink-0" />
          <span>{commentCount}</span>
        </button>

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

interface ActionIconProps {
  children: ReactNode;
  className: string;
  label: string;
  onClick?: () => void | Promise<void>;
}

function ActionIcon({ children, className, label, onClick }: ActionIconProps) {
  const baseClassName =
    'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-[transform,color,background-color] duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95';

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
