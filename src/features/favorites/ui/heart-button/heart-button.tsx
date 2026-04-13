'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { useAuthStore } from '@/entities/auth';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { useFavoriteMeeting } from '../../model/favorites.mutations';

import {
  HEART_BUTTON_CLASS,
  HEART_BUTTON_ICON_WRAPPER_CLASS,
  HEART_BUTTON_WRAPPER_CLASS,
} from './heart-button.constants';
import type { HeartButtonProps } from './heart-button.types';

const sizeIcon = {
  lg: 40,
  md: 38,
  sm: 24,
} as const;

const ringSizeClass = {
  lg: 'size-[60px]',
  md: 'size-[50px]',
  sm: 'size-10',
} as const;

export function HeartButton({
  className,
  sizeClass,
  iconClass,
  size = 'lg',
  isFavorited = false,
  meetingId,
}: HeartButtonProps) {
  const { isAuthenticated, setLoginRequired } = useAuthStore();
  const { isFavorited: isFavoritedState, toggleFavorite } = useFavoriteMeeting(
    isFavorited,
    meetingId
  );

  const src = isFavoritedState ? '/icons/main-page-heart.svg' : '/icons/main-page-not-heart.svg';
  const iconPx = sizeIcon[size];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setLoginRequired(true);
      return;
    }

    toggleFavorite();
  };

  return (
    <div className={cn(HEART_BUTTON_WRAPPER_CLASS, className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(HEART_BUTTON_CLASS, sizeClass ?? ringSizeClass[size])}
        onClick={handleClick}
      >
        <motion.div
          key={String(isFavoritedState)}
          animate={
            isFavoritedState ? { scale: [0.7, 1.25, 0.9, 1.05, 1] } : { scale: [1.1, 0.85, 1] }
          }
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileTap={isAuthenticated ? { scale: 0.8, transition: { duration: 0.1 } } : undefined}
          className={HEART_BUTTON_ICON_WRAPPER_CLASS}
        >
          <Image src={src} alt="좋아요" width={iconPx} height={iconPx} className={iconClass} />
        </motion.div>
      </Button>
    </div>
  );
}
