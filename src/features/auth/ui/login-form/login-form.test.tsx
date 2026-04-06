import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './login-form';

const mockMutateAsync = jest.fn();
const mockUseLogin = jest.fn();

jest.mock('@/entities/auth', () => ({
  useLogin: () => mockUseLogin(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => null }),
  useRouter: () => ({ push: jest.fn() }),
}));

describe('LoginForm (로그인 폼)', () => {
  beforeEach(() => {
    mockMutateAsync.mockClear();
    mockUseLogin.mockReturnValue({ mutateAsync: mockMutateAsync, isPending: false });
  });

  it('로그인 폼이 올바르게 렌더링되어야 한다', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i, { selector: 'input' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('이메일이 비어있을 때는 에러 메시지를 표시하지 않아야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/이메일/i);
    await user.click(emailInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
    });
  });

  it('올바르지 않은 이메일 형식 입력 후 포커스 이동(blur) 시 에러 메시지를 표시해야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/이메일/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });
  });

  it('비밀번호가 8자 미만일 때 "비밀번호가 8자 이상이 되도록 해 주세요." 에러를 표시해야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    await user.type(passwordInput, 'short');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
    });
  });

  it('비밀번호 표시/숨기기 버튼 클릭 시 input 타입이 변경되어야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    const toggleButton = screen.getByRole('button', { name: /비밀번호 표시/i });

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('로딩 중일 때 모든 입력 요소가 비활성화되어야 한다', () => {
    mockUseLogin.mockReturnValue({ mutateAsync: mockMutateAsync, isPending: true });
    render(<LoginForm />);

    expect(screen.getByLabelText(/이메일/i)).toBeDisabled();
    expect(screen.getByLabelText(/비밀번호/i, { selector: 'input' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /로그인 중.../i })).toBeDisabled();
  });

  it('유효한 데이터 입력 시 로그인 버튼이 활성화되고 클릭 시 mutateAsync가 호출되어야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });
    const submitButton = screen.getByRole('button', { name: /로그인/i });

    expect(submitButton).toBeDisabled();

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'validpassword123');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'validpassword123',
      });
    });
  });

  it('이메일 에러가 표시된 상태에서 입력을 모두 지우면 에러 메시지가 사라져야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/이메일/i);

    // 잘못된 입력
    await user.type(emailInput, 'invalid-email');
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });

    // 입력 삭제 후 blur
    await user.clear(emailInput);
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
    });
  });

  it('비밀번호 에러가 표시된 상태에서 입력을 모두 지우면 에러 메시지가 사라져야 한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/비밀번호/i, { selector: 'input' });

    // 잘못된 입력 (8자 미만)
    await user.type(passwordInput, 'short');
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
    });

    // 입력 삭제 후 blur
    await user.clear(passwordInput);
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText('비밀번호가 8자 이상이 되도록 해 주세요.')).not.toBeInTheDocument();
    });
  });
});
