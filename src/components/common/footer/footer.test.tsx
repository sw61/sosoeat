import { render, screen } from '@testing-library/react';

import { Footer } from './footer';

describe('Footer', () => {
  it('서비스 로고와 저작권 텍스트가 렌더링된다', () => {
    render(<Footer />);

    const logoImage = screen.getByAltText('서비스 로고');
    expect(logoImage).toBeInTheDocument();

    const copyrightText = screen.getByText('© 2026 소소잇. All rights reserved.');
    expect(copyrightText).toBeInTheDocument();
  });

  it('className prop이 전달되면 루트 엘리먼트에 적용된다', () => {
    const { container } = render(<Footer className="custom-test-class" />);
    expect(container.firstChild).toHaveClass('custom-test-class');
  });
});
