'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import useFavoriteMeeting from './hooks/use-heart-button';
import {
  HEART_BUTTON_CLASS,
  HEART_BUTTON_ICON_WRAPPER_CLASS,
  HEART_BUTTON_WRAPPER_CLASS,
} from './heart-button.constants';
import type { HeartButtonProps } from './heart-button.types';

/** 하트 SVG 크기 (픽셀) */
const sizeIcon = {
  lg: 40,
  md: 38,
  sm: 24,
} as const;

/** 바깥 원(ring) — 버튼 크기 */
const ringSizeClass = {
  lg: 'size-[60px]',
  md: 'size-[50px]',
  sm: 'size-10',
} as const;

export function HeartButton({
  className,
  size = 'lg',
  isFavorited = false,
  meetingId,
}: HeartButtonProps) {
  const { isFavorited: isFavoritedState, toggleFavorite } = useFavoriteMeeting(isFavorited);

  const src = isFavoritedState ? '/icons/main-page-heart.svg' : '/icons/main-page-not-heart.svg';
  const iconPx = sizeIcon[size];

  return (
    <div className={cn(HEART_BUTTON_WRAPPER_CLASS, className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(HEART_BUTTON_CLASS, ringSizeClass[size])}
        onClick={() => {
          if (meetingId === undefined) {
            if (process.env.NODE_ENV !== 'production') {
              console.error(
                'HeartButton: meetingId is required for toggleFavorite but was undefined.'
              );
            }
            return;
          }
          toggleFavorite(meetingId);
        }}
      >
        <motion.div
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          whileTap={{
            scale: isFavoritedState ? 1 : [0.1, 1.15, 0.6, 1],
            transition: { duration: 1, ease: 'easeOut' },
          }}
          className={HEART_BUTTON_ICON_WRAPPER_CLASS}
        >
          <Image src={src} alt="좋아요" width={iconPx} height={iconPx} />
        </motion.div>
      </Button>
    </div>
  );
}
