import { cn } from '@/lib/utils';

import styles from './notification-scroll-area.module.css';

export const scrollAreaDesktopClass = cn(
  styles.scroll,
  'flex h-[360px] w-full flex-col overflow-x-hidden overflow-y-auto'
);

export const scrollAreaMobileClass = cn(
  styles.scroll,
  'min-h-0 flex-1 overflow-x-hidden overflow-y-auto'
);
