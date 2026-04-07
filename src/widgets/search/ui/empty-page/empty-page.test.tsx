import { render, screen } from '@testing-library/react';

import { EMPTY_PAGE_MARGIN_CLASSES, EmptyPage } from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} />;
  },
}));

describe('EmptyPage', () => {
  it('루트에 뷰포트별 margin-top 유틸 클래스가 모두 포함된다', () => {
    render(<EmptyPage />);
    const root = screen.getByTestId('empty-page-root');

    expect(root).toHaveClass('mt-[145px]');
    expect(root).toHaveClass('md:mt-[180px]');
    expect(root).toHaveClass('lg:mt-[200px]');
  });

  it('EMPTY_PAGE_MARGIN_CLASSES 상수가 기본·375·744 구간용 mt를 모두 담는다', () => {
    expect(EMPTY_PAGE_MARGIN_CLASSES).toContain('mt-[145px]');
    expect(EMPTY_PAGE_MARGIN_CLASSES).toContain('md:mt-[180px]');
    expect(EMPTY_PAGE_MARGIN_CLASSES).toContain('lg:mt-[200px]');
  });

  it('빈 페이지 일러스트가 렌더된다', () => {
    render(<EmptyPage />);
    const images = screen.getAllByRole('img', { name: 'Empty Page' });
    expect(images).toHaveLength(2);
    expect(images.map((el) => el.getAttribute('src'))).toEqual(
      expect.arrayContaining(['/images/empty-page.svg', '/images/empty-page-small.svg'])
    );
  });
});
