'use client';

import dynamic from 'next/dynamic';

const NavigationBarDynamic = dynamic(
  () => import('./navigation-bar').then((m) => ({ default: m.NavigationBar })),
  { ssr: false }
);

export function NavigationBarClient() {
  return <NavigationBarDynamic />;
}
