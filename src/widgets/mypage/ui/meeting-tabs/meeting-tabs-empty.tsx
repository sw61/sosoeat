import Image from 'next/image';

export function MeetingTabsEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center max-sm:text-center">
      <div className="relative mb-4 h-[120px] w-[217px] opacity-50">
        <Image
          src="/images/empty-page.svg"
          alt="empty page"
          fill
          sizes="217px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
