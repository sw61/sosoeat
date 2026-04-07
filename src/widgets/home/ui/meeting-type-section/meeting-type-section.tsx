import Link from 'next/link';

import { ArrowRight, ShoppingCart, UtensilsCrossed } from 'lucide-react';

export function MeetingTypeSection() {
  return (
    <section className="px-4 py-6">
      <h2 className="mb-3 text-lg font-bold md:text-xl lg:text-2xl">어떤 모임을 원하세요?</h2>
      <div className="flex gap-3 md:gap-6 lg:gap-9">
        {/* 함께먹기 */}
        <Link
          href="/meetings?type=group-eat"
          className="bg-sosoeat-orange-600 relative flex-1 overflow-hidden rounded-2xl p-4 md:p-5 lg:p-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-white/20 lg:h-10 lg:w-10">
              <UtensilsCrossed className="h-5 w-5 text-white lg:h-6 lg:w-6" />
            </div>
            <h3 className="text-base font-bold text-white md:text-lg lg:text-xl">함께먹기</h3>
            <p className="hidden text-sm text-white/80 lg:block">
              가고 싶은 맛집이나 배달 음식을
              <br />
              함께 할 사람을 모아요
            </p>
            <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white lg:px-4 lg:py-1.5 lg:text-sm">
              모임 찾기
              <ArrowRight className="size-3 lg:size-4" />
            </span>
          </div>
          <UtensilsCrossed className="absolute right-3 bottom-3 h-14 w-14 text-white/20 lg:right-4 lg:bottom-4 lg:h-20 lg:w-20" />
        </Link>

        {/* 공동구매 */}
        <Link
          href="/meetings?type=group-buy"
          className="bg-sosoeat-blue-600 relative flex-1 overflow-hidden rounded-2xl p-4 md:p-5 lg:p-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-white/20 lg:h-10 lg:w-10">
              <ShoppingCart className="h-5 w-5 text-white lg:h-6 lg:w-6" />
            </div>
            <h3 className="text-base font-bold text-white md:text-lg lg:text-xl">공동구매</h3>
            <p className="hidden text-sm text-white/80 lg:block">
              너무 많아서 혼자 사기 부담스러운
              <br />
              식재료를 함께 구매해요
            </p>
            <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white lg:px-4 lg:py-1.5 lg:text-sm">
              모임 찾기
              <ArrowRight className="size-3 lg:size-4" />
            </span>
          </div>
          <ShoppingCart className="absolute right-3 bottom-3 h-14 w-14 text-white/20 lg:right-4 lg:bottom-4 lg:h-20 lg:w-20" />
        </Link>
      </div>
    </section>
  );
}
