import { ShoppingCart, UtensilsCrossed } from 'lucide-react';

export function MeetingTypeSection() {
  return (
    <section className="px-4 py-6">
      <h2 className="mb-3 text-lg font-bold md:text-xl lg:text-2xl">어떤 모임을 원하세요?</h2>
      <div className="flex gap-9">
        {/* 함께먹기 */}
        <div className="bg-sosoeat-orange-600 relative flex-1 overflow-hidden rounded-2xl p-6">
          <div className="flex flex-col gap-2">
            <UtensilsCrossed className="h-6 w-6 text-white" />
            <h3 className="text-xl font-bold text-white">함께먹기</h3>
            <p className="text-sm text-white/80">
              가고 싶은 맛집이나 배달 음식을
              <br />
              함께 할 사람을 모아요
            </p>
            <button className="mt-2 flex items-center gap-1 text-sm font-bold text-white">
              모임 찾기 →
            </button>
          </div>
          <UtensilsCrossed className="absolute right-4 bottom-4 h-20 w-20 text-white/20" />
        </div>

        {/* 공동구매 */}
        <div className="bg-sosoeat-blue-600 relative flex-1 overflow-hidden rounded-2xl p-6">
          <div className="flex flex-col gap-2">
            <ShoppingCart className="h-6 w-6 text-white" />
            <h3 className="text-xl font-bold text-white">공동구매</h3>
            <p className="text-sm text-white/80">
              너무 많아서 혼자 사기 부담스러운
              <br />
              식재료를 함께 구매해요
            </p>
            <button className="mt-2 flex items-center gap-1 text-sm font-bold text-white">
              모임 찾기 →
            </button>
          </div>
          <ShoppingCart className="absolute right-4 bottom-4 h-20 w-20 text-white/20" />
        </div>
      </div>
    </section>
  );
}
