import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { LoginForm } from './login-form';

describe('LoginForm (로그인 폼)', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('로그인 폼이 올바르게 렌더링되어야 한다', () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  test('이메일이 비어있을 때는 에러 메시지를 표시하지 않아야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
    });
  });

  test('올바르지 않은 이메일 형식 입력 후 포커스 이동(blur) 시 에러 메시지를 표시해야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });
  });

  test('비밀번호가 8자 미만일 때 "비밀번호가 8자 이상이 되도록 해 주세요." 에러를 표시해야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
    });
  });

  test('비밀번호 표시/숨기기 버튼 클릭 시 input 타입이 변경되어야 한다', () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    const toggleButton = screen.getByRole('button', { name: /비밀번호 표시/i });

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('로딩 중일 때 모든 입력 요소가 비활성화되어야 한다', () => {
    render(<LoginForm onSubmit={mockSubmit} isLoading={true} />);

    expect(screen.getByLabelText(/이메일/i)).toBeDisabled();
    expect(screen.getByLabelText(/비밀번호/i, { selector: 'input' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeDisabled();
  });

  test('유효한 데이터 입력 시 로그인 버튼이 활성화되고 클릭 시 onSubmit이 호출되어야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    const submitButton = screen.getByRole('button', { name: /로그인/i });

    expect(submitButton).toHaveClass('bg-sosoeat-gray-300');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword123' } });

    await waitFor(() => {
      expect(submitButton).toHaveClass('bg-sosoeat-orange-600');
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'validpassword123',
      });
    });
  });

  test('이메일 에러가 표시된 상태에서 입력을 모두 지우면 에러 메시지가 사라져야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText(/이메일/i);

    // 잘못된 입력
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });

    // 입력 삭제 후 blur
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput);
    await waitFor(
      () => {
        expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호 에러가 표시된 상태에서 입력을 모두 지우면 에러 메시지가 사라져야 한다', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });

    // 잘못된 입력 (8자 미만)
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
    });

    // 입력 삭제 후 blur
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);
    await waitFor(
      () => {
        expect(
          screen.queryByText('비밀번호가 8자 이상이 되도록 해 주세요.')
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
