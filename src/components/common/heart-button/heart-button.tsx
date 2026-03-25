import { useState } from 'react';

import Image from 'next/image';

const emptyHeart = '/icons/empty_heart.svg';
const filledHeart = '/icons/main-page-heart.svg';

// ─── 타입 ──────────────────────────────────────────────
type HeartSize = 'large' | 'medium' | 'small';

interface HeartButtonProps {
  /** 원 크기 (기본값: 'medium') */
  size?: HeartSize;
  /** API 응답으로 받은 초기 좋아요 여부 */
  isLiked?: boolean;
  /** 토글 시 콜백 — 부모에서 API 호출에 활용 */
  onToggle?: (isLiked: boolean) => void;
  className?: string;
}

// ─── 사이즈 설정 ────────────────────────────────────────
const SIZE_CONFIG: Record<HeartSize, { circle: number; heart: number }> = {
  large: { circle: 60, heart: 40 },
  medium: { circle: 50, heart: 38 },
  small: { circle: 40, heart: 32 },
};

// ─── 컴포넌트 ───────────────────────────────────────────
export function HeartButton({
  size = 'medium',
  isLiked = false,
  onToggle,
  className = '',
}: HeartButtonProps) {
  const [liked, setLiked] = useState(isLiked);

  const { circle, heart } = SIZE_CONFIG[size];

  const handleClick = () => {
    const next = !liked;
    setLiked(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ width: circle, height: circle }}
      className={[
        'flex items-center justify-center rounded-full',
        'border border-[--color-sosoeat-gray-300]',
        'cursor-pointer bg-white/90 p-0',
        'transition-colors duration-200 hover:bg-white',
        className,
      ].join(' ')}
      aria-label={liked ? '찜 취소' : '찜하기'}
      aria-pressed={liked}
    >
      <Image
        src={liked ? filledHeart : emptyHeart}
        width={heart}
        height={heart}
        alt=""
        aria-hidden="true"
      />
    </button>
  );
}
