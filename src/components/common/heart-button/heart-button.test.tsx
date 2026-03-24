import { render, screen } from '@testing-library/react';

import { HeartButton } from '@/components/common/heart-button/heart-button';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="heart-button-image" {...rest} />
  ),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
}));

describe('HeartButton', () => {
  it('찜하기 버튼이 렌더링된다', () => {
    render(<HeartButton isLiked={false} onToggle={() => {}} />);

    expect(screen.getByRole('button', { name: '찜하기' })).toBeInTheDocument();
  });

  it('isLiked가 true이면 찜 취소 버튼이 렌더링된다', () => {
    render(<HeartButton isLiked={true} onToggle={() => {}} />);

    expect(screen.getByRole('button', { name: '찜 취소' })).toBeInTheDocument();
    expect(screen.getByTestId('heart-button-image')).toHaveAttribute(
      'src',
      '/icons/main-page-heart.svg'
    );
  });

  it('className이 CardAction에 합쳐진다', () => {
    const { container } = render(
      <HeartButton isLiked={false} onToggle={() => {}} className="custom-heart-class" />
    );

    expect(container.querySelector('.custom-heart-class')).toBeInTheDocument();
  });
});
