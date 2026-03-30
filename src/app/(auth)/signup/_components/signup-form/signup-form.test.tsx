import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignupForm } from './signup-form';

/**
 * 테스트 설정을 위한 헬퍼 함수
 * userEvent.setup()을 포함하여 실제 사용자 상호작용을 더 정확하게 시뮬레이션합니다.
 */
const setup = (ui: React.ReactElement, options = {}) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(ui, { ...options }),
  };
};

describe('SignupForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('이메일 단계가 올바르게 렌더링되어야 합니다', () => {
    setup(<SignupForm onSubmit={mockOnSubmit} />);
    expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
  });

  it('이메일 입력 후 다음 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.type(emailInput, 'valid@example.com');

    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /다음/ });
      expect(nextButton).not.toBeDisabled();
    });

    const nextButton = screen.getByRole('button', { name: /다음/ });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
    });
  });

  it('이메일 형식으로 작성하지 않을 경우 에러 메세지가 출력되고 버튼이 비활성화되어야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.type(emailInput, 'invalid-email-format');
    // 다음 요소로 포커스 이동하여 blur 트리거
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
      const nextButton = screen.getByRole('button', { name: /다음/ });
      expect(nextButton).toBeDisabled();
    });
  });

  it('비밀번호가 8자 미만일 경우 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);

    await user.type(passwordInput, 'short');
    // 다음 요소로 포커스 이동하여 blur 트리거 (onTouched 효과)
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
    });
  });

  it('비밀번호 단계에서 비밀번호 불일치 시 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);

    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'different');
    // blur 트리거 → isTouched 상태로 전환 → getAuthFieldError가 에러 노출
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('비밀번호가 일치하지 않습니다')).toBeInTheDocument();
    });
  });

  it('비밀번호 단계에서 이전 버튼을 누르면 이메일 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/이메일/);
    await user.type(emailInput, 'valid@example.com');

    const nextButton = screen.getByRole('button', { name: /다음/ });
    await waitFor(() => expect(nextButton).not.toBeDisabled());
    await user.click(nextButton);

    // 비밀번호 단계에서 이전 버튼 클릭
    await waitFor(() => expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument());
    const prevButton = screen.getByRole('button', { name: /이전/ });
    await user.click(prevButton);

    // 다시 이메일 단계로 복귀 확인
    await waitFor(() => {
      expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
    });
  });

  it('닉네임 단계에서 이전 버튼을 누르면 비밀번호 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="name" />);

    // 닉네임 단계인지 검증
    expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /이전/ });
    await user.click(prevButton);

    // 2단계(비밀번호)로 돌아오는지 검증
    await waitFor(() => {
      expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
    });
  });

  it('비밀번호 단계의 다음 버튼은 두 입력란 모두 조건에 맞고 일치할 때만 활성화되어야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);
    const nextButton = screen.getByRole('button', { name: /다음/ });

    // 초기 상태 비활성화
    expect(nextButton).toBeDisabled();

    // 비밀번호만 입력
    await user.type(passwordInput, 'password123');
    expect(nextButton).toBeDisabled();

    // 틀린 비밀번호 확인 입력
    await user.type(confirmInput, 'different123');
    await user.tab(); // 포커스 해제하여 유효성 검사 트리거
    expect(nextButton).toBeDisabled();

    // 올바른 비밀번호 확인 입력 (수정)
    await user.clear(confirmInput);
    await user.type(confirmInput, 'password123');

    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('닉네임에 특수문자, 공백, 자음/모음 단일 사용 시 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="name" />);
    const nameInput = screen.getByLabelText(/이름/);

    // 공백 포함 입력
    await user.type(nameInput, 'hello 123');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('특수문자, 공백, 자음/모음 단일 사용은 불가합니다.')
      ).toBeInTheDocument();
    });

    // 지우고 단일 자음 입력
    await user.clear(nameInput);
    await user.type(nameInput, 'ㄱㄴㄷ');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('특수문자, 공백, 자음/모음 단일 사용은 불가합니다.')
      ).toBeInTheDocument();
    });
  });

  it('로딩 중일 때는 버튼에 "회원가입 중..."이 표시되고 버튼이 비활성화되어야 합니다', () => {
    setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="name" isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /회원가입 중.../ });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('이메일 필드에 포커스만 했다가 나갔을 때(값 없음) 에러 메시지가 표시되지 않아야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.click(emailInput);
    await user.tab(); // 값 입력 없이 포커스 이동

    expect(screen.queryByText('올바른 이메일 형식이 아닙니다.')).not.toBeInTheDocument();
  });

  it('비밀번호 가시성 토글 버튼을 클릭하면 input 타입이 password와 text 사이에서 전환되어야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />);

    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const toggleButton = screen.getByLabelText('비밀번호 표시 토글');

    // 초기 상태: password
    expect(passwordInput).toHaveAttribute('type', 'password');

    // 클릭 시: text
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // 다시 클릭 시: password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('3단계를 모두 통과하면 onSubmit이 올바른 데이터로 호출되어야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);

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
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        name: '테스터',
      });
    });
  });
});
