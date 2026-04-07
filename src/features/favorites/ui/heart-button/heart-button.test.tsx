import { render, screen } from '@testing-library/react';

import { HeartButton } from './heart-button';

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

//하트버튼
describe('HeartButton', () => {
  it('기본 상태에서 빈 하트 아이콘이 렌더링된다', () => {
    render(<HeartButton meetingId={1} isFavorited={false} />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
    expect(screen.getByTestId('heart-button-image')).toHaveAttribute(
      'src',
      '/icons/main-page-not-heart.svg'
    );
  });

  it('찜 상태에서 채운 하트 아이콘이 렌더링된다', () => {
    render(<HeartButton meetingId={1} isFavorited />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
    expect(screen.getByTestId('heart-button-image')).toHaveAttribute(
      'src',
      '/icons/main-page-heart.svg'
    );
  });

  it('className이 CardAction에 합쳐진다', () => {
    const { container } = render(<HeartButton meetingId={1} className="custom-heart-class" />);

    expect(container.querySelector('.custom-heart-class')).toBeInTheDocument();
  });
});
