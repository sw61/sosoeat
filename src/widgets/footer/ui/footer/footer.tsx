import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

interface FooterProps {
  className?: string;
}

const LOGO_SRC = '/images/logo.svg';
const LOGO_ALT = '소소잇 로고';
const COPYRIGHT_TEXT = '© 2026 소소잇. All rights reserved.';

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('flex h-[60px] w-full items-center bg-white px-6', className)}>
      <div className="mx-auto flex w-full max-w-[1227px] items-center justify-between">
        <div className="relative h-5.5 w-17 shrink-0">
          <Image src={LOGO_SRC} alt={LOGO_ALT} fill sizes="68px" className="object-contain" />
        </div>
        <p className="text-xs font-medium text-gray-500">{COPYRIGHT_TEXT}</p>
      </div>
    </footer>
  );
};
