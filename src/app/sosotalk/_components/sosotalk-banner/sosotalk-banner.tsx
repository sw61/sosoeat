import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SosoTalkBannerProps } from './sosotalk-banner.types';

export const SosoTalkBanner = ({
  imageUrl,
  alt = '소소토크 배너 이미지',
  className,
}: SosoTalkBannerProps) => {
  return (
    <section className="flex justify-center">
      <div
        className={cn(
          'relative h-[60px] w-full overflow-hidden rounded-none md:h-[200px] xl:max-w-[1280px] xl:rounded-[16px]',
          className
        )}
      >
        <Image src={imageUrl} alt={alt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};
