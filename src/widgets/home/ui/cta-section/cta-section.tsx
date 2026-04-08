'use client';

import Link from 'next/link';

import { Star, Users } from 'lucide-react';

import { MeetingCreateModal, useMeetingCreateTrigger } from '@/features/meeting-create';
import { Button } from '@/shared/ui/button';

export function CtaSection() {
  const { handleOpen, isOpen, close, createMeeting } = useMeetingCreateTrigger();

  return (
    <section className="bg-sosoeat-orange-600 relative z-10 mt-16 flex w-full flex-col items-center justify-center gap-8 px-6 py-16 text-white md:mt-[100px] md:py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-2xl leading-tight font-bold md:text-3xl">지금 바로 시작해볼까요?</h2>
        <p className="max-w-[280px] text-sm font-medium text-white/80 md:max-w-none md:text-base">
          소소잇과 함께 더 맛있고 알뜰한 1인 가구 식생활을 경험해보세요.
        </p>
      </div>

      <div className="flex w-full max-w-[400px] flex-row gap-2 px-4 sm:w-auto sm:max-w-none sm:px-0">
        <Button
          onClick={handleOpen}
          className="text-sosoeat-orange-600 h-[56px] flex-1 cursor-pointer rounded-2xl bg-white text-base font-bold hover:bg-white/90 sm:w-[180px]"
        >
          <Star className="mr-1 h-4 w-4" />
          모임 만들기
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-[56px] flex-1 cursor-pointer rounded-2xl border-[1.2px] border-white/40 bg-white/15 text-base font-bold text-white hover:bg-white/20 hover:text-white sm:w-[180px]"
        >
          <Link href="/search">
            <Users className="mr-1 h-4 w-4" />
            모임 둘러보기
          </Link>
        </Button>
      </div>

      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </section>
  );
}
