import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignupForm } from './signup-form';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

/**
 * 테스트 설정을 위한 헬퍼 함수
 * userEvent.setup()을 포함하여 실제 사용자 상호작용을 더 정확하게 시뮬레이션합니다.
 */
const setup = (ui: React.ReactElement, options = {}) => {
  const user = userEvent.setup();
  const wrapper = createWrapper();
  return {
    user,
    ...render(ui, { wrapper, ...options }),
  };
};

describe('SignupForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('이메일 단계가 올바르게 렌더링되어야 합니다', () => {
    setup(<SignupForm onSubmit={mockOnSubmit} />);
    expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
  });

  test('중복된 이메일 입력 시 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/이메일/);

    // 중복 시뮬레이션용 이메일 입력
    await user.type(emailInput, 'test@example.com');

    // 제출 버튼 클릭 시 즉시 유효성 검사 수행
    const nextButton = screen.getByRole('button', { name: /다음/ });
    await user.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText('이미 사용 중인 이메일입니다.')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('이메일 입력 후 다음 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.type(emailInput, 'valid@example.com');

    await waitFor(
      () => {
        const nextButton = screen.getByRole('button', { name: /다음/ });
        expect(nextButton).not.toBeDisabled();
      },
      { timeout: 2000 }
    );

    const nextButton = screen.getByRole('button', { name: /다음/ });
    await user.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('이메일 형식으로 작성하지 않을 경우 에러 메세지가 출력되고 버튼이 비활성화되어야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/이메일/);

    await user.type(emailInput, 'invalid-email-format');
    // 다음 요소로 포커스 이동하여 blur 트리거
    await user.tab();

    await waitFor(
      () => {
        expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
        const nextButton = screen.getByRole('button', { name: /다음/ });
        expect(nextButton).toBeDisabled();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호가 8자 미만일 경우 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);

    await user.type(passwordInput, 'short');
    // 다음 요소로 포커스 이동하여 blur 트리거 (onTouched 효과)
    await user.tab();

    await waitFor(
      () => {
        expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호 단계에서 비밀번호 불일치 시 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);

    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'different');

    await waitFor(
      () => {
        expect(screen.getByText('비밀번호가 일치하지 않습니다')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호와 비밀번호 확인을 동일하게 입력한 후 비밀번호 내용을 변경하면 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />);
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);

    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'password123');

    // 동일하게 입력되어 에러가 없어야 함
    await waitFor(() => {
      expect(screen.queryByText('비밀번호가 일치하지 않습니다')).not.toBeInTheDocument();
    });

    // 비밀번호 내용을 변경
    await user.type(passwordInput, '4');

    // 에러 메시지가 표출되는지 확인
    await waitFor(
      () => {
        expect(screen.getByText('비밀번호가 일치하지 않습니다')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호 단계에서 이전 버튼을 누르면 이메일 단계로 이동해야 합니다', async () => {
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

  test('닉네임 단계에서 이전 버튼을 누르면 비밀번호 단계로 이동해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="nickname" />);

    // 닉네임 단계인지 검증
    expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /이전/ });
    await user.click(prevButton);

    // 2단계(비밀번호)로 돌아오는지 검증
    await waitFor(
      () => {
        expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호 단계의 다음 버튼은 두 입력란 모두 조건에 맞고 일치할 때만 활성화되어야 합니다', async () => {
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

    await waitFor(
      () => {
        expect(nextButton).not.toBeDisabled();
      },
      { timeout: 2000 }
    );
  });

  test('닉네임에 특수문자, 공백, 자음/모음 단일 사용 시 에러 메시지를 표시해야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} defaultStep="nickname" />);
    const nicknameInput = screen.getByLabelText(/닉네임/);

    // 공백 포함 입력
    await user.type(nicknameInput, 'hello 123');
    await user.tab();

    await waitFor(
      () => {
        expect(
          screen.getByText('특수문자, 공백, 자음/모음 단일 사용은 불가합니다.')
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // 지우고 단일 자음 입력
    await user.clear(nicknameInput);
    await user.type(nicknameInput, 'ㄱㄴㄷ');
    await user.tab();

    await waitFor(
      () => {
        expect(
          screen.getByText('특수문자, 공백, 자음/모음 단일 사용은 불가합니다.')
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('마지막 단계 완료 시 onSubmit이 호출되어야 합니다', async () => {
    const { user } = setup(<SignupForm onSubmit={mockOnSubmit} />);

    // 1단계: 이메일
    const emailInput = screen.getByLabelText(/이메일/);
    await user.type(emailInput, 'valid@example.com');
    await user.click(screen.getByRole('button', { name: /다음/ }));

    // 2단계: 비밀번호
    await waitFor(() => expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument());
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);
    await user.type(passwordInput, 'password123');
    await user.type(confirmInput, 'password123');
    await user.click(screen.getByRole('button', { name: /다음/ }));

    // 3단계: 닉네임
    await waitFor(() => expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument());
    const nicknameInput = screen.getByLabelText(/닉네임/);
    await user.type(nicknameInput, 'testuser');

    await waitFor(
      () => {
        const submitButton = screen.getByRole('button', { name: '회원가입' });
        expect(submitButton).not.toBeDisabled();
      },
      { timeout: 2000 }
    );

    const submitButton = screen.getByRole('button', { name: '회원가입' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
