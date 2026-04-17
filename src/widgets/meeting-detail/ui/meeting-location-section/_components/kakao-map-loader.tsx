'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Script from 'next/script';

const KakaoMap = dynamic(() => import('@/shared/ui/kakao-map/kakao-map').then((m) => m.KakaoMap), {
  ssr: false,
  loading: () => (
    <div className="bg-sosoeat-gray-100 h-[240px] w-full cursor-grab outline-none select-none **:select-none md:h-[320px] lg:h-[352px]" />
  ),
});

interface KakaoMapLoaderProps {
  appKey: string;
  latitude: number;
  longitude: number;
}

function isKakaoMapsSdkReady() {
  return typeof window !== 'undefined' && typeof window.kakao?.maps?.load === 'function';
}

export function KakaoMapLoader({ appKey, latitude, longitude }: KakaoMapLoaderProps) {
  const [hasLoadedScript, setHasLoadedScript] = useState(isKakaoMapsSdkReady);
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
      {sdkReady ? (
        <KakaoMap latitude={latitude} longitude={longitude} />
      ) : (
        <div className="bg-sosoeat-gray-100 h-[240px] w-full cursor-grab outline-none select-none **:select-none md:h-[320px] lg:h-[352px]" />
      )}
    </>
  );
}
