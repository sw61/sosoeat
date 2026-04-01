import { render, screen } from '@testing-library/react';

import MeetingSearchBanner from './meeting-search-banner';

jest.mock('next/image', () => {
  function MockImage({ alt, src }: { alt: string; src: string }) {
    return <img alt={alt} src={src} data-testid="banner-image" />;
  }
  return { __esModule: true, default: MockImage };
});

describe('MeetingDetailBanner', () => {
  const hardcodedImageUrl =
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80';
  const hardcodedAlt = '모임 검색 배너 이미지';
  const hardcodedSubtitle =
    '가고 싶었던 맛집, 혼자 가기 아쉬웠죠? 모여요에서 같이 먹을 사람을 찾아보세요.';

  const defaultProps = {
    imageUrl: 'https://example.com/banner.jpg',
    alt: '모임 배너',
    titleContent: '함께하면',
    subtitleContent: '더 맛있어요',
  };

  it('배너 이미지와 대체 텍스트가 렌더링된다', () => {
    render(<MeetingSearchBanner {...defaultProps} />);

    const img = screen.getByTestId('banner-image');
    expect(img).toHaveAttribute('src', hardcodedImageUrl);
    expect(img).toHaveAttribute('alt', hardcodedAlt);
  });

  it('titleContent가 화면에 표시된다', () => {
    render(<MeetingSearchBanner {...defaultProps} />);

    expect(screen.getByRole('heading', { name: '함께하면 더 맛있어요' })).toBeInTheDocument();
  });

  it('subtitle prop과 무관하게 하드코딩된 부제 문구가 렌더링된다', () => {
    render(<MeetingSearchBanner {...defaultProps} subtitle={<p>부제목 문구입니다</p>} />);

    expect(screen.getByText(hardcodedSubtitle)).toBeInTheDocument();
  });

  it('subtitle을 넘기지 않아도 하드코딩된 부제 문구가 렌더링된다', () => {
    render(<MeetingSearchBanner {...defaultProps} />);

    expect(screen.getByText(hardcodedSubtitle)).toBeInTheDocument();
  });

  it('className이 루트 래퍼에 적용된다', () => {
    const { container } = render(
      <MeetingSearchBanner {...defaultProps} className="custom-banner-root" />
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-banner-root');
  });

  it('딤 오버레이에 aria-hidden이 있다', () => {
    const { container } = render(<MeetingSearchBanner {...defaultProps} />);

    const overlays = container.querySelectorAll('[aria-hidden="true"]');
    expect(overlays.length).toBeGreaterThanOrEqual(1);
  });
});
