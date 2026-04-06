import { cn } from '@/shared/lib/utils';

import {
  SCROLL_AREA_DESKTOP_TAILWIND_CLASS,
  SCROLL_AREA_MOBILE_TAILWIND_CLASS,
} from './notification-scroll-area.constants';

import styles from './notification-scroll-area.module.css';

export const scrollAreaDesktopClass = cn(styles.scroll, SCROLL_AREA_DESKTOP_TAILWIND_CLASS);

export const scrollAreaMobileClass = cn(styles.scroll, SCROLL_AREA_MOBILE_TAILWIND_CLASS);
