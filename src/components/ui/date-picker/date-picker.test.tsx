import { render, screen } from '@testing-library/react';

import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  it('label이 전달되면 렌더링된다', () => {
    render(<DatePicker label="날짜 선택" />);

    expect(screen.getByText('날짜 선택')).toBeInTheDocument();
  });

  it('label이 없으면 label 요소가 없다', () => {
    const { container } = render(<DatePicker />);

    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('errorMessage가 전달되면 에러 메시지가 렌더링된다', () => {
    render(<DatePicker errorMessage="날짜를 입력해주세요" />);

    expect(screen.getByText('날짜를 입력해주세요')).toBeInTheDocument();
  });

  it('input type이 date이다', () => {
    const { container } = render(<DatePicker />);

    const input = container.querySelector('input[type="date"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  it('input에 전달된 props가 적용된다', () => {
    render(<DatePicker data-testid="date-input" />);

    const input = document.querySelector('input[data-slot="input"]');
    expect(input).toHaveAttribute('data-testid', 'date-input');
  });
});
