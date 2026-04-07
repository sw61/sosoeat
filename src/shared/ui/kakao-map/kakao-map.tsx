'use client';

import { useEffect, useRef } from 'react';

import type { KakaoMapProps } from './kakao-map.types';

const BRAND_LABEL = '소소잇';
const MARKER_ACCENT = '#FF6600';

/** 카카오 CustomOverlay용 HTML (인라인 스타일만 사용 — SDK가 문자열로 삽입함) */
function buildMeetingPlaceOverlayContent(label: string): string {
  const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="${MARKER_ACCENT}"/></svg>`;

  return `
    <div style="display:flex;flex-direction:column;align-items:center;user-select:none;-webkit-user-select:none;outline:none;">
      <div style="display:flex;align-items:center;gap:6px;background:${MARKER_ACCENT};color:#fff;font-size:13px;font-weight:600;padding:6px 14px 6px 6px;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,0.22);white-space:nowrap;">
        <div style="width:28px;height:28px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${pinSvg}
        </div>
        <span>${label}</span>
      </div>
      <div style="width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:9px solid ${MARKER_ACCENT};margin-top:-1px;"></div>
    </div>
  `;
}

export function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let cancelled = false;
    let overlay: kakao.maps.CustomOverlay | null = null;

    window.kakao.maps.load(() => {
      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = '';

      const position = new window.kakao.maps.LatLng(latitude, longitude);
      const map = new window.kakao.maps.Map(containerRef.current, {
        center: position,
        level: 2,
      });

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content: buildMeetingPlaceOverlayContent(BRAND_LABEL),
        yAnchor: 1,
        xAnchor: 0.5,
      });
      customOverlay.setMap(map);
      overlay = customOverlay;
    });

    return () => {
      cancelled = true;
      overlay?.setMap(null);
      if (node) node.innerHTML = '';
    };
  }, [latitude, longitude]);

  return (
    <div
      ref={containerRef}
      className="h-[240px] w-full cursor-grab outline-none select-none **:outline-none **:select-none active:cursor-grabbing md:h-[320px] lg:h-[352px]"
    />
  );
}
