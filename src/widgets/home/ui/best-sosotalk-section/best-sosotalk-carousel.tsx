'use client';

import { useEffect, useRef } from 'react';

import type { SosoTalkPostCardItem } from '@/entities/post';

import { SosoTalkCardCompact } from '../best-soeat-card';

interface BestSosotalkCarouselProps {
  posts: SosoTalkPostCardItem[];
}

export function BestSosotalkCarousel({ posts }: BestSosotalkCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const showScrollbar = () => {
      el.style.setProperty('--scrollbar-color', 'var(--color-gray-300)');
    };
    const hideScrollbar = () => {
      el.style.setProperty('--scrollbar-color', 'transparent');
    };

    const handleScroll = () => {
      showScrollbar();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(hideScrollbar, 800);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      hasDragged.current = false;
      startX.current = e.clientX;
      startScrollLeft.current = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const delta = startX.current - e.clientX;
        if (Math.abs(delta) > 4) hasDragged.current = true;
        el.scrollLeft = startScrollLeft.current + delta;
      });
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      el.releasePointerCapture(e.pointerId);
    };

    const handleClickCapture = (e: MouseEvent) => {
      if (hasDragged.current) {
        e.preventDefault();
        hasDragged.current = false;
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('dragstart', handleDragStart);
    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', handlePointerUp);
    el.addEventListener('click', handleClickCapture, { capture: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('dragstart', handleDragStart);
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', handlePointerUp);
      el.removeEventListener('click', handleClickCapture, { capture: true });
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex cursor-grab gap-[18px] overflow-x-auto px-4 pb-2 select-none [scrollbar-color:var(--scrollbar-color,transparent)_transparent] [scrollbar-width:thin] active:cursor-grabbing [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[--scrollbar-color,transparent]"
    >
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
  );
}
