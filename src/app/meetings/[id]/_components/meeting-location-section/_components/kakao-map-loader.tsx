'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Script from 'next/script';

const KakaoMap = dynamic(() => import('@/components/common/kakao-map').then((m) => m.KakaoMap), {
  ssr: false,
  loading: () => <div className="bg-sosoeat-gray-100 h-[240px] w-full md:h-[320px] lg:h-[352px]" />,
});

interface KakaoMapLoaderProps {
  latitude: number;
  longitude: number;
}

export function KakaoMapLoader({ latitude, longitude }: KakaoMapLoaderProps) {
  const [sdkReady, setSdkReady] = useState(false);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false`}
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
