const STEPS = [
  {
    step: 'STEP 01',
    icon: '🔍',
    title: '모임 탐색',
    description: '원하는 음식이나 식재료로 모임을 검색하고, 내 동네의 모임을 찾아보세요.',
  },
  {
    step: 'STEP 02',
    icon: '🤝',
    title: '참여 신청',
    description: '마음에 드는 모임에 참여 버튼을 눌러 신청하면 끝! 모임장과 연락해요.',
  },
  {
    step: 'STEP 03',
    icon: '🎉',
    title: '함께 즐기기',
    description: '함께 맛있는 음식을 먹거나, 식재료를 나눠 스마트하게 절약해요.',
  },
];

export function HowToUseSection() {
  return (
    <section className="px-4 py-10 lg:py-[50px]">
      <div className="flex flex-col items-center gap-8 lg:min-h-[317px] lg:justify-between">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            소소잇, 어떻게 사용하나요?
          </h2>
          <p className="text-sm text-gray-500 lg:text-base">3단계로 쉽게 시작해보세요</p>
        </div>

        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-center md:gap-[11px]">
          {STEPS.map(({ step, icon, title, description }) => (
            <div
              key={step}
              className="flex flex-col items-center gap-2 text-center md:flex-1 md:gap-[11px] lg:min-h-[207px] lg:w-[250px] lg:flex-none lg:justify-center"
            >
              <div className="bg-sosoeat-orange-100 flex h-12 w-12 items-center justify-center rounded-[14px] text-2xl shadow md:h-14 md:w-14 md:rounded-[20px] md:text-3xl lg:h-16 lg:w-16 lg:rounded-[25px] lg:text-3xl">
                {icon}
              </div>
              <span className="text-xs font-semibold tracking-widest text-orange-400">{step}</span>
              <p className="text-sm font-bold break-keep text-gray-900 md:text-base">{title}</p>
              <p className="text-xs leading-relaxed break-keep text-gray-400 md:text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
