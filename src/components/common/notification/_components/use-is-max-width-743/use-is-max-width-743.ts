'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(max-width: 743px)';

function getSnapshot(): boolean {
  if (typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(QUERY).matches;
}

function subscribe(onChange: () => void): () => void {
  if (typeof window.matchMedia !== 'function') return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

function getServerSnapshot(): boolean {
  return false;
}

/** 뷰포트 너비가 743px 이하인지 */
export function useIsMaxWidth743(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
