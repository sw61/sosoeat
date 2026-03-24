'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { CardAction } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { HeartButtonProps } from './heart-button.types';

export function HeartButton({ className }: HeartButtonProps) {
  return (
    <CardAction className={cn('absolute top-4 right-[17px] z-10 m-0 shrink-0', className)}>
      <Button
        variant="ghost"
        size="icon"
        className="border-sosoeat-gray-300 h-[50px] w-[50px] cursor-pointer rounded-full border bg-white/90 hover:bg-white/90"
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
          <Image src="/icons/main-page-heart.svg" alt="좋아요" width={40} height={40} />
        </motion.div>
      </Button>
    </CardAction>
  );
}
