import { render, type RenderOptions, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignupForm } from './signup-form';

const mockMutateAsync = jest.fn();

jest.mock('@/services/auth', () => ({
  useSignUp: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const setup = (ui: React.ReactElement, options: RenderOptions = {}) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, options),
  };
};

describe('SignupForm', () => {
  beforeEach(() => {
    mockMutateAsync.mockClear();
  });

  it('이메일 단계가 올바르게 렌더링되어야 합니다', () => {
    setup(<SignupForm />);
    expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
  });

  it('이메일 입력 후 다음 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.type(emailInput, 'valid@example.com');

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled();
    });

    await user.click(screen.getByRole('button', { name: /다음/ }));

    await waitFor(() => {
      expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
    });
  });

  it('이메일 형식으로 작성하지 않을 경우 에러 메세지가 출력되고 버튼이 비활성화되어야 합니다', async () => {
    const { user } = setup(<SignupForm />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.type(emailInput, 'invalid-email-format');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /다음/ })).toBeDisabled();
    });
  });

  it('비밀번호가 8자 미만일 경우 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);

    await user.type(passwordInput, 'short');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
    });
  });

  it('비밀번호 단계에서 비밀번호 불일치 시 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);

    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'different');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('비밀번호가 일치하지 않습니다')).toBeInTheDocument();
    });
  });

  it('비밀번호 단계에서 이전 버튼을 누르면 이메일 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm />);
    const emailInput = screen.getByLabelText(/이메일/);
    await user.type(emailInput, 'valid@example.com');

    await waitFor(() => expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled());
    await user.click(screen.getByRole('button', { name: /다음/ }));

    await waitFor(() => expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /이전/ }));

    await waitFor(() => {
      expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
    });
  });

  it('닉네임 단계에서 이전 버튼을 누르면 비밀번호 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm defaultStep="name" />);

    expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /이전/ }));

    await waitFor(() => {
      expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
    });
  });

  it('비밀번호 단계의 다음 버튼은 두 입력란 모두 조건에 맞고 일치할 때만 활성화되어야 합니다', async () => {
    const { user } = setup(<SignupForm defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);
    const nextButton = screen.getByRole('button', { name: /다음/ });

    expect(nextButton).toBeDisabled();

    await user.type(passwordInput, 'password123');
    expect(nextButton).toBeDisabled();

    await user.type(confirmInput, 'different123');
    await user.tab();
    expect(nextButton).toBeDisabled();

    await user.clear(confirmInput);
    await user.type(confirmInput, 'password123');

    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('닉네임에 특수문자, 공백, 자음/모음 단일 사용 시 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm defaultStep="name" />);
    const nameInput = screen.getByLabelText(/이름/);

    await user.type(nameInput, 'hello 123');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('특수문자, 공백, 자음/모음 단일 사용은 불가합니다.')
      ).toBeInTheDocument();
    });

    await user.clear(nameInput);
    await user.type(nameInput, 'ㄱㄴㄷ');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('특수문자, 공백, 자음/모음 단일 사용은 불가합니다.')
      ).toBeInTheDocument();
    });
  });

  it('이메일 필드에 포커스만 했다가 나갔을 때(값 없음) 에러 메시지가 표시되지 않아야 합니다', async () => {
    const { user } = setup(<SignupForm />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.click(emailInput);
    await user.tab();

    expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
  });

  it('비밀번호 가시성 토글 버튼을 클릭하면 input 타입이 password와 text 사이에서 전환되어야 합니다', async () => {
    const { user } = setup(<SignupForm defaultStep="password" />);

    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const toggleButton = screen.getByLabelText('비밀번호 표시 토글');

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('3단계를 모두 통과하면 mutateAsync가 올바른 데이터로 호출되어야 합니다', async () => {
    const { user } = setup(<SignupForm />);

    // Step 1: 이메일
    await user.type(screen.getByLabelText(/이메일/), 'test@example.com');
    await waitFor(() => expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled());
    await user.click(screen.getByRole('button', { name: /다음/ }));

    // Step 2: 비밀번호
    await waitFor(() => expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument());
    await user.type(screen.getByLabelText(/^비밀번호\*/), 'password123');
    await user.type(screen.getByLabelText(/^비밀번호 확인\*/), 'password123');
    await waitFor(() => expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled());
    await user.click(screen.getByRole('button', { name: /다음/ }));

    // Step 3: 이름
    await waitFor(() => expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument());
    await user.type(screen.getByLabelText(/이름/), '테스터');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /회원가입$/ })).not.toBeDisabled()
    );
    await user.click(screen.getByRole('button', { name: /회원가입$/ }));

    // 최종 제출 데이터 검증 (passwordConfirm 제외)
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        name: '테스터',
      });
    });
  });

  it('이메일 중복 등 서버 에러 발생 시 이메일 단계(step1)로 돌아오고 에러 메시지를 표시해야 합니다', async () => {
    const errorMessage = '이미 사용 중인 이메일입니다.';
    mockMutateAsync.mockRejectedValueOnce(new Error(errorMessage));

    const { user } = setup(<SignupForm />);

    // Step 1: 이메일
    await user.type(screen.getByLabelText(/이메일/), 'duplicate@example.com');
    await waitFor(() => expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled());
    await user.click(screen.getByRole('button', { name: /다음/ }));

    // Step 2: 비밀번호
    await waitFor(() => expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument());
    await user.type(screen.getByLabelText(/^비밀번호\*/), 'password123');
    await user.type(screen.getByLabelText(/^비밀번호 확인\*/), 'password123');
    await waitFor(() => expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled());
    await user.click(screen.getByRole('button', { name: /다음/ }));

    // Step 3: 이름 입력 후 제출
    await waitFor(() => expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument());
    await user.type(screen.getByLabelText(/이름/), '테스터');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /회원가입$/ })).not.toBeDisabled()
    );
    await user.click(screen.getByRole('button', { name: /회원가입$/ }));

    // 서버 에러 발생 → 이메일 단계(step1)로 복귀 및 에러 메시지 표시
    await waitFor(() => {
      expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
