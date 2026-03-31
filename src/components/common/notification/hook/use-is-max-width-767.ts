'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(max-width: 767px)';

const getSnapshot = (): boolean => {
  if (typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(QUERY).matches;
};

const subscribe = (onChange: () => void): (() => void) => {
  if (typeof window.matchMedia !== 'function') return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

const getServerSnapshot = (): boolean => false;

export const useIsMaxWidth767 = (): boolean => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
