import { render, screen } from '@testing-library/react';

import MeetingDetailBanner from './meeting-detail-banner';

jest.mock('next/image', () => {
  function MockImage({ alt, src }: { alt: string; src: string }) {
    return <img alt={alt} src={src} data-testid="banner-image" />;
  }
  return { __esModule: true, default: MockImage };
});

describe('MeetingDetailBanner', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/banner.jpg',
    alt: '모임 배너',
    titleContent: <h2>함께하면 더 맛있어요</h2>,
  };

  it('배너 이미지와 대체 텍스트가 렌더링된다', () => {
    render(<MeetingDetailBanner {...defaultProps} />);

    const img = screen.getByTestId('banner-image');
    expect(img).toHaveAttribute('src', defaultProps.imageUrl);
    expect(img).toHaveAttribute('alt', defaultProps.alt);
  });

  it('titleContent가 화면에 표시된다', () => {
    render(<MeetingDetailBanner {...defaultProps} />);

    expect(screen.getByRole('heading', { name: '함께하면 더 맛있어요' })).toBeInTheDocument();
  });

  it('subtitle이 있으면 부제 문구가 렌더링된다', () => {
    render(<MeetingDetailBanner {...defaultProps} subtitle={<p>부제목 문구입니다</p>} />);

    expect(screen.getByText('부제목 문구입니다')).toBeInTheDocument();
  });

  it('subtitle을 넘기지 않으면 paragraph 역할이 없다', () => {
    render(<MeetingDetailBanner {...defaultProps} />);

    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('className이 루트 래퍼에 적용된다', () => {
    const { container } = render(
      <MeetingDetailBanner {...defaultProps} className="custom-banner-root" />
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-banner-root');
  });

  it('딤 오버레이에 aria-hidden이 있다', () => {
    const { container } = render(<MeetingDetailBanner {...defaultProps} />);

    const overlays = container.querySelectorAll('[aria-hidden="true"]');
    expect(overlays.length).toBeGreaterThanOrEqual(1);
  });
});
