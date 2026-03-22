import { render, screen } from '@testing-library/react';

import { CountingBadge } from './counting-badge';

describe('CountingBadge', () => {
  describe('large (기본 사이즈)', () => {
    it('count가 렌더링된다', () => {
      render(<CountingBadge count={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('count가 0일 때 0이 렌더링된다', () => {
      render(<CountingBadge count={0} />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('large 스타일이 적용된다', () => {
      render(<CountingBadge count={3} />);
      const badge = screen.getByText('3');
      expect(badge).toHaveClass(
        'h-4',
        'px-[7px]',
        'rounded-full',
        'bg-sosoeat-orange-600',
        'text-white'
      );
    });
  });

  describe('small 사이즈', () => {
    it('count가 렌더링된다', () => {
      render(<CountingBadge count={5} size="small" />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('small 스타일이 적용된다', () => {
      render(<CountingBadge count={3} size="small" />);
      const badge = screen.getByText('3');
      expect(badge).toHaveClass(
        'h-3',
        'w-3',
        'rounded-full',
        'bg-sosoeat-orange-600',
        'text-white'
      );
    });
  });
});
