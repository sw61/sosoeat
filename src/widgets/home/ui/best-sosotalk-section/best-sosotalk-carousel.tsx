'use client';

import { useEffect, useRef } from 'react';

import type { SosoTalkPostCardItem } from '@/entities/post';

import { SosoTalkCardCompact } from './sosotalk-card-compact';

interface BestSosotalkCarouselProps {
  posts: SosoTalkPostCardItem[];
}

const DRAG_THRESHOLD_PX = 10;

export function BestSosotalkCarousel({ posts }: BestSosotalkCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;

      if (target?.closest('a, button')) {
        hasDragged.current = false;
        return;
      }

      if (!e.isPrimary || e.button !== 0 || el.scrollWidth <= el.clientWidth) {
        hasDragged.current = false;
        return;
      }

      isPointerDown.current = true;
      hasDragged.current = false;
      startX.current = e.clientX;
      startScrollLeft.current = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const delta = startX.current - e.clientX;

        if (Math.abs(delta) <= DRAG_THRESHOLD_PX) {
          return;
        }

        hasDragged.current = true;
        el.scrollLeft = startScrollLeft.current + delta;
      });
    };

    const handlePointerEnd = (e: PointerEvent) => {
      if (!isPointerDown.current) return;

      isPointerDown.current = false;

      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
    };

    const handleClickCapture = (e: MouseEvent) => {
      if (!hasDragged.current) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('dragstart', handleDragStart);
    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerEnd);
    el.addEventListener('pointercancel', handlePointerEnd);
    el.addEventListener('click', handleClickCapture, { capture: true });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('dragstart', handleDragStart);
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerEnd);
      el.removeEventListener('pointercancel', handlePointerEnd);
      el.removeEventListener('click', handleClickCapture, { capture: true });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="-mt-0.5 overflow-x-auto px-4 pt-0.5 pb-2 select-none [scrollbar-color:var(--color-gray-300)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="flex min-w-max cursor-grab gap-[18px] active:cursor-grabbing">
        {posts.map((post) => (
          <SosoTalkCardCompact
            key={post.id}
            id={post.id}
            title={post.title}
            imageUrl={post.imageUrl}
            authorName={post.authorName}
            authorImageUrl={post.authorImageUrl}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
