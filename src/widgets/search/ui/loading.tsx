'use client';

import { domAnimation, LazyMotion, Variants } from 'framer-motion';
import * as m from 'framer-motion/m';

function Loading() {
  const containerVariants: Variants = {
    jump: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const dotVariants: Variants = {
    jump: {
      y: -10,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate="jump"
        variants={containerVariants}
        className="flex items-center justify-center gap-[10px]"
      >
        <m.div
          className="bg-sosoeat-orange-400 size-3 rounded-full [will-change:transform]"
          variants={dotVariants}
        />
        <m.div
          className="bg-sosoeat-orange-400 size-3 rounded-full [will-change:transform]"
          variants={dotVariants}
        />
        <m.div
          className="bg-sosoeat-orange-400 size-3 rounded-full [will-change:transform]"
          variants={dotVariants}
        />
      </m.div>
    </LazyMotion>
  );
}

export default Loading;
