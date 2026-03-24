'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { CardAction } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { HeartButtonProps } from './heart-button.types';

export function HeartButton({ isLiked, onToggle, className }: HeartButtonProps) {
  return (
    <CardAction className={cn('absolute top-4 right-[17px] z-10 m-0 shrink-0', className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label={isLiked ? '찜 취소' : '찜하기'}
        onClick={onToggle}
        className="bg-sosoeat-gray-500 hover:bg-sosoeat-gray-500 h-[60px] w-[60px] cursor-pointer rounded-full"
      >
        <motion.div
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          whileTap={{
            scale: [0.1, 1.15, 0.6, 1],
            transition: { duration: 1, ease: 'easeOut' },
          }}
          className="flex items-center justify-center"
        >
          {isLiked ? (
            <Image src="/icons/main-page-heart.svg" alt="찜 취소" width={40} height={40} />
          ) : (
            <Image src="/icons/empty_heart.svg" alt="찜하기" width={32} height={32} />
          )}
        </motion.div>
      </Button>
    </CardAction>
  );
}
