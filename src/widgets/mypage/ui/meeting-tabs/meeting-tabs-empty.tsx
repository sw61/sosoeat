import Image from 'next/image';

export function MeetingTabsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-40 max-sm:text-center">
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
