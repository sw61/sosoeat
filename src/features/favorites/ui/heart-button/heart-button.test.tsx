import { fireEvent, render, screen } from '@testing-library/react';

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
  LazyMotion: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  domAnimation: {},
}));

jest.mock(
  'framer-motion/m',
  () =>
    new Proxy(
      {},
      {
        get: (_, _key) => {
          return ({ children, ...rest }: { children: React.ReactNode; [key: string]: unknown }) => (
            <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
          );
        },
      }
    )
);

const mockSetLoginRequired = jest.fn();

jest.mock('@/entities/auth', () => ({
  useAuthStore: jest.fn(),
}));

const mockToggleFavorite = jest.fn();
jest.mock('../../model/favorites.mutations', () => ({
  useFavoriteMeeting: (initialIsFavorited: boolean, _meetingId: number) => ({
    isFavorited: initialIsFavorited,
    toggleFavorite: mockToggleFavorite,
  }),
}));

const { useAuthStore } = jest.requireMock('@/entities/auth') as {
  useAuthStore: jest.Mock;
};

describe('HeartButton', () => {
  beforeEach(() => {
    mockToggleFavorite.mockClear();
    mockSetLoginRequired.mockClear();
    useAuthStore.mockReturnValue({
      isAuthenticated: true,
      setLoginRequired: mockSetLoginRequired,
    });
  });

  it('기본 상태에서는 빈 하트 아이콘이 렌더링된다', () => {
    render(<HeartButton meetingId={1} isFavorited={false} />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
    expect(screen.getByTestId('heart-button-image')).toHaveAttribute(
      'src',
      '/icons/main-page-not-heart.svg'
    );
  });

  it('찜 상태에서는 채운 하트 아이콘이 렌더링된다', () => {
    render(<HeartButton meetingId={1} isFavorited />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
    expect(screen.getByTestId('heart-button-image')).toHaveAttribute(
      'src',
      '/icons/main-page-heart.svg'
    );
  });

  it('className이 CardAction 래퍼에 합쳐진다', () => {
    const { container } = render(<HeartButton meetingId={1} className="custom-heart-class" />);

    expect(container.querySelector('.custom-heart-class')).toBeInTheDocument();
  });

  it('로그인 상태에서 클릭하면 toggleFavorite를 호출한다', () => {
    render(<HeartButton meetingId={42} isFavorited={false} />);

    fireEvent.click(screen.getByRole('button', { name: '좋아요' }));

    expect(mockToggleFavorite).toHaveBeenCalled();
    expect(mockSetLoginRequired).not.toHaveBeenCalled();
  });

  it('비로그인 상태에서는 좋아요 반응 대신 로그인 모달만 연다', () => {
    useAuthStore.mockReturnValue({
      isAuthenticated: false,
      setLoginRequired: mockSetLoginRequired,
    });

    render(<HeartButton meetingId={42} isFavorited={false} />);

    fireEvent.click(screen.getByRole('button', { name: '좋아요' }));

    expect(mockToggleFavorite).not.toHaveBeenCalled();
    expect(mockSetLoginRequired).toHaveBeenCalledWith(true);
  });
});
