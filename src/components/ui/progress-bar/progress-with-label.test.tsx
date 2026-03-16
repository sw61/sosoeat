import { render, screen } from '@testing-library/react';

import { ProgressWithLabel } from '.';

describe('ProgressWithLabel', () => {
  test('기본적으로 참여중이 나온다.', () => {
    render(<ProgressWithLabel current={5} max={10} variant="groupEat" />);

    const peopleNumberText = screen.getByText('참여중');

    expect(peopleNumberText).toBeInTheDocument();
  });
  test('current 5 max 10 일때 5 / 10 이 나온다.', () => {
    const current = 5;
    const max = 10;

    render(<ProgressWithLabel current={current} max={max} variant="groupEat" />);

    const peopleNumberText = screen.getByText('5 / 10');

    expect(peopleNumberText).toBeInTheDocument();
  });
});
