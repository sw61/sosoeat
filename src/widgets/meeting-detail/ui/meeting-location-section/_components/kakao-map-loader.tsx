'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Script from 'next/script';

const KakaoMap = dynamic(() => import('@/shared/ui/kakao-map/kakao-map').then((m) => m.KakaoMap), {
  ssr: false,
  loading: () => <div className="bg-sosoeat-gray-100 h-[240px] w-full md:h-[320px] lg:h-[352px]" />,
});

interface KakaoMapLoaderProps {
  appKey: string;
  latitude: number;
  longitude: number;
}

export function KakaoMapLoader({ appKey, latitude, longitude }: KakaoMapLoaderProps) {
  const [sdkReady, setSdkReady] = useState(false);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />
      {sdkReady ? (
        <KakaoMap latitude={latitude} longitude={longitude} />
      ) : (
        <div className="bg-sosoeat-gray-100 h-[240px] w-full md:h-[320px] lg:h-[352px]" />
      )}
    </>
  );
}
