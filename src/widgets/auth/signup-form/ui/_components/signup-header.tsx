import Image from 'next/image';

export const SignupHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1.5 md:space-y-2">
      <div className="relative h-10 w-20 md:h-12 md:w-24">
        <Image src="/images/logo.svg" alt="소소잇 로고" fill className="object-contain" priority />
      </div>
      <h1 className="text-lg font-bold text-gray-900 md:text-xl">소소잇 가입하기</h1>
      <p className="text-xs font-medium text-gray-500 md:text-sm">
        1인 가구를 위한 식생활 모임에 합류하세요
      </p>
    </div>
  );
};
