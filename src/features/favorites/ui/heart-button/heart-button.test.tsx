import { render, screen } from '@testing-library/react';

import { HeartButton } from './heart-button';

const mockUseFavoriteMeeting = jest.fn();

jest.mock('../../model/use-favorites', () => ({
  useFavoriteMeeting: (initialIsFavorited: boolean) => mockUseFavoriteMeeting(initialIsFavorited),
}));

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
  beforeEach(() => {
    mockUseFavoriteMeeting.mockReturnValue({
      isFavorited: false,
      isPending: false,
      toggleFavorite: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the empty heart icon by default', () => {
    render(<HeartButton meetingId={1} isFavorited={false} />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
    expect(screen.getByTestId('heart-button-image')).toHaveAttribute(
      'src',
      '/icons/main-page-not-heart.svg'
    );
  });

  it('renders the filled heart icon when favorited', () => {
    mockUseFavoriteMeeting.mockReturnValue({
      isFavorited: true,
      isPending: false,
      toggleFavorite: jest.fn(),
    });

    render(<HeartButton meetingId={1} isFavorited />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
    expect(screen.getByTestId('heart-button-image')).toHaveAttribute(
      'src',
      '/icons/main-page-heart.svg'
    );
  });

  it('applies the custom wrapper className', () => {
    const { container } = render(<HeartButton meetingId={1} className="custom-heart-class" />);

    expect(container.querySelector('.custom-heart-class')).toBeInTheDocument();
  });

  it('disables the button while a favorite request is pending', () => {
    mockUseFavoriteMeeting.mockReturnValue({
      isFavorited: false,
      isPending: true,
      toggleFavorite: jest.fn(),
    });

    render(<HeartButton meetingId={1} isFavorited={false} />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeDisabled();
  });
});
