'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { useFavoriteMeeting } from '../../model/favorites.mutations';

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
  const { isFavorited: isFavoritedState, toggleFavorite } = useFavoriteMeeting(
    isFavorited,
    meetingId
  );

  const src = isFavoritedState ? '/icons/main-page-heart.svg' : '/icons/main-page-not-heart.svg';
  const iconPx = sizeIcon[size];

  return (
    <div className={cn(HEART_BUTTON_WRAPPER_CLASS, className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(HEART_BUTTON_CLASS, ringSizeClass[size])}
        onClick={toggleFavorite}
      >
        <motion.div
          key={String(isFavoritedState)}
          animate={
            isFavoritedState ? { scale: [0.7, 1.25, 0.9, 1.05, 1] } : { scale: [1.1, 0.85, 1] }
          }
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
          className={HEART_BUTTON_ICON_WRAPPER_CLASS}
        >
          <Image src={src} alt="좋아요" width={iconPx} height={iconPx} />
        </motion.div>
      </Button>
    </div>
  );
}
