import { render, screen } from '@testing-library/react';

import { HeartButton } from '@/components/common/heart-button/heart-button';

describe('HeartButton', () => {
  it('찜하기 버튼이 렌더링된다', () => {
    render(<HeartButton isLiked={false} />);

    expect(screen.getByRole('button', { name: '찜하기' })).toBeInTheDocument();
  });

  it('isLiked가 true이면 찜 취소 버튼이 렌더링된다', () => {
    render(<HeartButton isLiked={true} />);

    expect(screen.getByRole('button', { name: '찜 취소' })).toBeInTheDocument();
  });

  it('className이 버튼에 합쳐진다', () => {
    const { container } = render(<HeartButton isLiked={false} className="custom-heart-class" />);

    expect(container.querySelector('.custom-heart-class')).toBeInTheDocument();
  });
});
