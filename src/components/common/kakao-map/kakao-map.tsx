'use client';

import { useEffect, useRef } from 'react';

import type { KakaoMapProps } from './kakao-map.types';

export function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    window.kakao.maps.load(() => {
      if (!containerRef.current) return;

      const position = new window.kakao.maps.LatLng(latitude, longitude);
      const map = new window.kakao.maps.Map(containerRef.current, {
        center: position,
        level: 1,
      });
      const markerImage = new window.kakao.maps.MarkerImage(
        '/images/logo.svg',
        new window.kakao.maps.Size(48, 48),
        { offset: new window.kakao.maps.Point(24, 48) }
      );
      new window.kakao.maps.Marker({ map, position, image: markerImage });
    });
  }, [latitude, longitude]);

  return <div ref={containerRef} className="h-[240px] w-full md:h-[320px] lg:h-[352px]" />;
}
