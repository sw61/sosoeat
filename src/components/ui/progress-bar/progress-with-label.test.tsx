import { render, screen } from '@testing-library/react';

import { ProgressWithLabel } from '.';

describe('ProgressWithLabel', () => {
  test('전체인원이 찼을 시 마감이 나온다.', () => {
    render(<ProgressWithLabel current={10} max={10} variant="groupEat" />);

    const peopleNumberText = screen.getByText('마감');

    expect(peopleNumberText).toBeInTheDocument();
  });
  test('current 5 max 10 일때 5/10 이 나온다.', () => {
    const current = 5;
    const max = 10;

    render(<ProgressWithLabel current={current} max={max} variant="groupEat" />);

    const peopleNumberText = screen.getByText('5/10 참여중');

    expect(peopleNumberText).toBeInTheDocument();
  });
});
