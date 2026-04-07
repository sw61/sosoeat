'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface MeetingLocationAddressRowProps {
  address: string;
}

export function MeetingLocationAddressRow({ address }: MeetingLocationAddressRowProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('주소가 복사되었습니다.');
    } catch {
      toast.error('복사에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-[12px] bg-white px-5 py-4">
      <p className="text-sosoeat-gray-900 max-w-[calc(100%-5.5rem)] min-w-0 shrink text-sm font-bold wrap-break-word">
        {address}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="text-sosoeat-orange-600 hover:text-sosoeat-orange-700 inline-flex shrink-0 cursor-pointer items-center gap-1 text-sm font-semibold transition-colors"
        aria-label="주소 복사"
      >
        <Copy className="size-4" strokeWidth={2.25} />
        복사
      </button>
    </div>
  );
}
