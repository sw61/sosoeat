'use client';

import { domAnimation, LazyMotion, m } from 'framer-motion';

export function LoadingDots() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate="jump"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex items-center justify-center gap-2.5"
      >
        {[0, 1, 2].map((i) => (
          <m.div
            key={i}
            variants={{
              jump: {
                transform: 'translateY(-12px)',
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                },
              },
            }}
            className="bg-sosoeat-orange-400 size-3 rounded-full"
          />
        ))}
      </m.div>
    </LazyMotion>
  );
}
