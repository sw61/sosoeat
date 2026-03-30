import { Star, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="bg-sosoeat-orange-600 mt-[100px] flex w-full flex-col items-center justify-center gap-6 py-20 text-white">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-3xl font-bold">지금 바로 시작해볼까요?</h2>
        <p className="text-base font-medium text-white/80">
          소소잇과 함께 더 맛있고 알뜰한 1인 가구 식생활을 경험해보세요.
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="text-sosoeat-orange-600 h-[57px] w-[180px] cursor-pointer rounded-2xl bg-white text-base font-bold hover:bg-white/90">
          <Star className="mr-1 h-4 w-4" />
          모임 만들기
        </Button>
        <Button
          variant="outline"
          className="h-[57px] w-[180px] cursor-pointer rounded-2xl border-[1.2px] border-white/40 bg-white/15 text-base font-bold text-white hover:bg-white/20"
        >
          <Users className="mr-1 h-4 w-4" />
          모임 둘러보기
        </Button>
      </div>
    </section>
  );
}
