import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = '(max-width: 767px)';

export function useIsMobile(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(MOBILE_BREAKPOINT);
      mq.addEventListener('change', callback);
      return () => mq.removeEventListener('change', callback);
    },
    () => window.matchMedia(MOBILE_BREAKPOINT).matches,
    () => false
  );
}
