'use client';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Autoplay from 'embla-carousel-autoplay';

import { cn } from '@/shared/lib/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';

interface Banner {
  imageUrl: string;
  alt: string;
  href?: string;
}

const BANNERS: Banner[] = [
  {
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/v2/tmp/meetings/1775021008378-d25ae489-1950-4c33-9e91-d962b4e63c14.jpg',
    alt: '신선한 오늘의 추천 메뉴',
    href: '/search',
  },
  {
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/v2/tmp/meetings/1775021059723-2224efa7-cd60-4b75-9ef8-b05b1db43596.jpg',
    alt: '모닝 브런치 스페셜 세트',
    href: '/sosotalk',
  },
  {
    imageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/v2/tmp/meetings/1775021087340-27221ae9-edba-448c-97ee-775ae7e75b75.jpg',
    alt: '저녁 모임을 위한 정갈한 요리',
    href: '/search',
  },
];

export function MainBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const pluginsRef = useRef([
    Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={pluginsRef.current}
        opts={{
          loop: true,
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="m-0">
          {BANNERS.map((banner, index) => (
            <CarouselItem
              key={`${banner.imageUrl}-${index}`}
              className="w-full min-w-0 shrink-0 grow-0 basis-full p-0"
            >
              {banner.href ? (
                <Link href={banner.href} className="block">
                  <BannerImage banner={banner} index={index} />
                </Link>
              ) : (
                <BannerImage banner={banner} index={index} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 내비게이션 버튼: 1200px 컨테이너 기준 배치 */}
        {BANNERS.length > 1 && (
          <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
            <div className="relative mx-auto h-full max-w-300">
              <CarouselPrevious
                className={cn(
                  'pointer-events-auto absolute top-1/2 -translate-y-1/2 transition-all duration-300',
                  'left-8 xl:-left-16',
                  'h-12.5 w-12.5 border border-white/20 bg-white/15 text-white backdrop-blur-md',
                  'hover:scale-105 hover:border-white/40 hover:bg-white/25',
                  'active:translate-y-[-50%] active:scale-95 active:bg-white/30'
                )}
              />
              <CarouselNext
                className={cn(
                  'pointer-events-auto absolute top-1/2 -translate-y-1/2 transition-all duration-300',
                  'right-8 xl:-right-16',
                  'h-12.5 w-12.5 border border-white/20 bg-white/15 text-white backdrop-blur-md',
                  'hover:scale-105 hover:border-white/40 hover:bg-white/25',
                  'active:translate-y-[-50%] active:scale-95 active:bg-white/30'
                )}
              />
            </div>
          </div>
        )}
      </Carousel>

      {/* 중앙 콘텐츠(인디케이터/카운터) 영역 */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 z-40 w-full -translate-x-1/2 px-4">
        <div className="mx-auto flex flex-col items-center gap-5">
          <div className="flex gap-2.5">
            {BANNERS.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={cn(
                  'pointer-events-auto h-1.75 rounded-full shadow-sm transition-all duration-500',
                  index === current ? 'w-6 bg-white' : 'w-1.75 bg-white/40 hover:bg-white/60'
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-xs font-semibold tracking-[0.66px] text-white/50">
            {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerImage({ banner, index }: { banner: Banner; index: number }) {
  return (
    <div className="relative h-[450px]">
      <Image
        src={banner.imageUrl}
        alt={banner.alt}
        fill
        priority={index === 0}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
      />
      {/* 가독성을 위한 오버레이 */}
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}
