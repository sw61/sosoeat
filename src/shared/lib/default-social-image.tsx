import { ImageResponse } from 'next/og';

export const socialImageAlt = '소소잇 공유 이미지';

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function createDefaultSocialImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top left, rgba(255, 190, 92, 0.35), transparent 32%), linear-gradient(135deg, #fff8f1 0%, #fff1e6 55%, #ffe2cf 100%)',
        color: '#2d241f',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 360,
          height: 360,
          borderRadius: '9999px',
          background: 'rgba(255, 122, 26, 0.18)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -140,
          left: -60,
          width: 420,
          height: 260,
          borderRadius: '9999px',
          background: 'rgba(255, 122, 26, 0.1)',
          transform: 'rotate(-12deg)',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            padding: '14px 24px',
            borderRadius: 9999,
            background: '#ff7a1a',
            color: '#ffffff',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          소소잇
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
            }}
          >
            <span>함께 먹고, 함께 나누는</span>
            <span>소소한 일상 모임</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 34,
              lineHeight: 1.4,
              color: '#6b5b50',
              letterSpacing: '-0.02em',
            }}
          >
            <span>맛집 모임부터 공동구매, 소소토크까지</span>
            <span>소소잇에서 같이할 사람을 찾아보세요.</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            color: '#8a7668',
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '9999px',
              background: '#ff7a1a',
            }}
          />
          <span>sosoeat.com</span>
        </div>
      </div>
    </div>,
    socialImageSize
  );
}
