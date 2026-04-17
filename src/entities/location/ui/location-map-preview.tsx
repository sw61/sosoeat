'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Script from 'next/script';

import { cn } from '@/shared/lib/utils';

const KakaoMap = dynamic(() => import('@/shared/ui/kakao-map/kakao-map').then((m) => m.KakaoMap), {
  ssr: false,
  loading: () => <div className="bg-sosoeat-gray-100 h-24 w-full rounded-xl md:h-32" />,
});

interface LocationMapPreviewProps {
  latitude: number;
  longitude: number;
  className?: string;
}

function isKakaoMapsSdkReady() {
  return typeof window !== 'undefined' && typeof window.kakao?.maps?.load === 'function';
}

export function LocationMapPreview({ latitude, longitude, className }: LocationMapPreviewProps) {
  const [hasLoadedScript, setHasLoadedScript] = useState(isKakaoMapsSdkReady);
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? '';
  const sdkReady = hasLoadedScript || isKakaoMapsSdkReady();

  return (
    <>
      <Script
        id="kakao-map-sdk"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setHasLoadedScript(true)}
        onReady={() => setHasLoadedScript(true)}
      />
      <div className="overflow-hidden rounded-xl">
        {sdkReady ? (
          <KakaoMap latitude={latitude} longitude={longitude} className={className} />
        ) : (
          <div
            className={cn('bg-sosoeat-gray-100 w-full rounded-xl', className ?? 'h-24 md:h-32')}
          />
        )}
      </div>
    </>
  );
}
