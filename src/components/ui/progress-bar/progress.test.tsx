import { render, screen } from '@testing-library/react';

import { Progress } from '@/components/ui/progress-bar';

describe('Progress', () => {
  it("variant='groupEat'일 때 groupEat 색상 클래스가 적용된다", () => {
    const { container } = render(<Progress value={50} variant="groupEat" />);

    const indicate = container.querySelector('[data-slot="progress-indicator"]');

    expect(indicate).toHaveClass('bg-sosoeat-orange-600');
  });

  it("variant='groupBuy'일 때 groupBuy 색상 클래스가 적용된다", () => {
    const { container } = render(<Progress value={50} variant="groupBuy" />);

    const indicate = container.querySelector('[data-slot="progress-indicator"]');

    expect(indicate).toHaveClass('bg-sosoeat-blue-600');
  });

  it('progressbar role로 렌더링된다', () => {
    render(<Progress value={50} variant="groupBuy" />);

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toBeInTheDocument();
  });

  it('value가 aria-valuenow에 반영된다', () => {
    render(<Progress value={30} variant="groupBuy" />);

    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveAttribute('aria-valuenow', '30');
  });
});
