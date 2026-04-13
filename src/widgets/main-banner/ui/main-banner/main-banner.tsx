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
  badge: string;
  titleWhite: string;
  titleAccent: string;
  description: string;
  ctaLabel: string;
  accentClassName: string;
  buttonClassName: string;
}

const BANNERS: Banner[] = [
  {
    imageUrl: '/images/main_banner_001.jpg',
    alt: '함께먹기 메인 배너',
    href: '/search',
    badge: '함께먹기',
    titleWhite: '함께하면 더',
    titleAccent: '맛있어요',
    description: '가고 싶었던 맛집, 혼자 가기 아쉬웠죠? 소소잇에서 같이 먹을 사람을 찾아보세요.',
    ctaLabel: '함께먹기 모임 보기',
    accentClassName: 'text-sosoeat-orange-600',
    buttonClassName:
      'border-sosoeat-orange-500/50 bg-sosoeat-orange-600 hover:bg-sosoeat-orange-500 shadow-[0_16px_40px_rgba(255,122,26,0.35)]',
  },
  {
    imageUrl: '/images/main_banner_002.jpg',
    alt: '공동구매 메인 배너',
    href: '/search',
    badge: '공동구매',
    titleWhite: '같이사면 더',
    titleAccent: '행복해요',
    description: '대용량 제품, 혼자 구매하기 어려웠죠? 소소잇에서 함께 나눌 사람을 찾아보세요.',
    ctaLabel: '공동구매 모임 보기',
    accentClassName: 'text-blue-500',
    buttonClassName:
      'border-blue-400/50 bg-blue-500 hover:bg-blue-400 shadow-[0_16px_40px_rgba(59,130,246,0.35)]',
  },
  {
    imageUrl: '/images/main_banner_003.jpg',
    alt: '소소토크 메인 배너',
    href: '/sosotalk',
    badge: '소소토크',
    titleWhite: '소통하면 더',
    titleAccent: '즐거워요',
    description: '나만 아는 맛집, 나만 모르던 제품. 소소잇에서 함께 정보를 나누고 이득 보세요.',
    ctaLabel: '소소토크 게시글 보기',
    accentClassName: 'text-sosoeat-orange-600',
    buttonClassName:
      'border-sosoeat-orange-500/50 bg-sosoeat-orange-600 hover:bg-sosoeat-orange-500 shadow-[0_16px_40px_rgba(255,122,26,0.35)]',
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
    <div className="relative h-[420px] md:h-[450px]">
      <Image
        src={banner.imageUrl}
        alt={banner.alt}
        fill
        priority={index === 0}
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pb-14 md:pb-16">
        <div className="w-full max-w-[294px] text-white md:max-w-[300px]">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold backdrop-blur-md md:text-xs">
            {banner.badge}
          </div>
          <div className="text-[40px] leading-[1.04] font-bold tracking-[-0.04em] md:text-[46px] xl:text-[48px]">
            <p>{banner.titleWhite}</p>
            <p className={banner.accentClassName}>{banner.titleAccent}</p>
          </div>
          <p className="mt-4 text-[13px] leading-5.5 break-keep text-white/82 md:text-[14px] md:leading-6">
            {banner.description}
          </p>
          <div className="mt-5">
            <span
              className={cn(
                'inline-flex min-h-10 items-center rounded-2xl border px-4.5 text-[13px] font-semibold text-white transition-colors md:min-h-11 md:px-5 md:text-sm',
                banner.buttonClassName
              )}
            >
              {banner.ctaLabel}
              <span className="ml-3 text-base md:text-lg" aria-hidden="true">
                {'>'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
