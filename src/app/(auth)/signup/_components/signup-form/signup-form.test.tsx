import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

describe('SignupForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('이메일 단계가 올바르게 렌더링되어야 합니다', () => {
    render(<SignupForm onSubmit={mockOnSubmit} />, { wrapper: createWrapper() });
    expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
  });

  test('중복된 이메일 입력 시 에러 메시지를 표시해야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />, { wrapper: createWrapper() });
    const emailInput = screen.getByLabelText(/이메일/);

    // 중복 시뮬레이션용 이메일 입력
    await userEvent.type(emailInput, 'test@example.com');

    // 제출 버튼 클릭 시 즉시 유효성 검사 수행
    const nextButton = screen.getByRole('button', { name: /다음/ });
    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText('이미 사용 중인 이메일입니다.')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('이메일 입력 후 다음 단계로 이동해야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />, { wrapper: createWrapper() });
    const emailInput = screen.getByLabelText(/이메일/);

    await userEvent.type(emailInput, 'valid@example.com');

    await waitFor(
      () => {
        const nextButton = screen.getByRole('button', { name: /다음/ });
        expect(nextButton).not.toBeDisabled();
      },
      { timeout: 2000 }
    );

    const nextButton = screen.getByRole('button', { name: /다음/ });
    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('이메일 형식으로 작성하지 않을 경우 에러 메세지가 출력되고 버튼이 비활성화되어야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />, { wrapper: createWrapper() });
    const emailInput = screen.getByLabelText(/이메일/);

    await userEvent.type(emailInput, 'invalid-email-format');
    fireEvent.blur(emailInput);

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
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />, {
      wrapper: createWrapper(),
    });
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);

    await userEvent.type(passwordInput, 'short');

    // blur 처리하여 즉시 검증 유도 (onTouched 효과)
    fireEvent.blur(passwordInput);

    await waitFor(
      () => {
        expect(screen.getByText('비밀번호가 8자 이상이 되도록 해 주세요.')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호 단계에서 비밀번호 불일치 시 에러 메시지를 표시해야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />, {
      wrapper: createWrapper(),
    });
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);

    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmInput, 'different');

    await waitFor(
      () => {
        expect(screen.getByText('비밀번호가 일치하지 않습니다')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호와 비밀번호 확인을 동일하게 입력한 후 비밀번호 내용을 변경하면 에러 메시지를 표시해야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />, {
      wrapper: createWrapper(),
    });
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);

    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmInput, 'password123');

    // 동일하게 입력되어 에러가 없어야 함
    await waitFor(() => {
      expect(screen.queryByText('비밀번호가 일치하지 않습니다')).not.toBeInTheDocument();
    });

    // 비밀번호 내용을 변경
    await userEvent.type(passwordInput, '4');

    // 에러 메시지가 표출되는지 확인
    await waitFor(
      () => {
        expect(screen.getByText('비밀번호가 일치하지 않습니다')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호 단계에서 이전 버튼을 누르면 이메일 단계로 이동해야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />, { wrapper: createWrapper() });
    const emailInput = screen.getByLabelText(/이메일/);
    await userEvent.type(emailInput, 'valid@example.com');
    await waitFor(() => expect(screen.getByRole('button', { name: /다음/ })).not.toBeDisabled());
    fireEvent.click(screen.getByRole('button', { name: /다음/ }));

    // 비밀번호 단계에서 이전 버튼 클릭
    await waitFor(() => expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument());
    const prevButton = screen.getByRole('button', { name: /이전/ });
    fireEvent.click(prevButton);

    // 다시 이메일 단계로 복귀 확인
    await waitFor(() => {
      expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
    });
  });

  test('닉네임 단계에서 이전 버튼을 누르면 비밀번호 단계로 이동해야 합니다', async () => {
    // 3단계(닉네임) 표출을 위해 defaultStep 사용
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="nickname" />, {
      wrapper: createWrapper(),
    });

    // 닉네임 단계인지 검증
    expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /이전/ });
    fireEvent.click(prevButton);

    // 2단계(비밀번호)로 돌아오는지 검증
    await waitFor(
      () => {
        expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('비밀번호 단계의 다음 버튼은 두 입력란 모두 조건에 맞고 일치할 때만 활성화되어야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="password" />, {
      wrapper: createWrapper(),
    });
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);
    const nextButton = screen.getByRole('button', { name: /다음/ });

    // 초기 상태 비활성화
    expect(nextButton).toBeDisabled();

    // 비밀번호만 입력
    await userEvent.type(passwordInput, 'password123');
    expect(nextButton).toBeDisabled();

    // 틀린 비밀번호 확인 입력
    await userEvent.type(confirmInput, 'different123');
    fireEvent.blur(confirmInput);
    expect(nextButton).toBeDisabled();

    // 올바른 비밀번호 확인 입력 (수정)
    await userEvent.clear(confirmInput);
    await userEvent.type(confirmInput, 'password123');

    await waitFor(
      () => {
        expect(nextButton).not.toBeDisabled();
      },
      { timeout: 2000 }
    );
  });

  test('닉네임을 2자 미만 입력했을 경우와 10자 초과 입력했을 경우 글자 수 에러 메시지를 표시해야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="nickname" />, {
      wrapper: createWrapper(),
    });
    const nicknameInput = screen.getByLabelText(/닉네임/);

    // 1자 입력
    await userEvent.type(nicknameInput, 'a');
    fireEvent.blur(nicknameInput);

    await waitFor(
      () => {
        expect(screen.getByText('닉네임은 2자 이상이어야 합니다.')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
    // 11자 입력
    await userEvent.type(nicknameInput, 'aaaaaaaaaaa');
    fireEvent.blur(nicknameInput);

    await waitFor(
      () => {
        expect(screen.getByText('닉네임은 10자 이하이어야 합니다.')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('입력란을 터치 후 비워뒀을 경우 빈 칸에서는 에러 메시지를 표시하지 않아야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="nickname" />, {
      wrapper: createWrapper(),
    });
    const nicknameInput = screen.getByLabelText(/닉네임/);

    // 입력 후 완전히 지워 dirty/touched 상태를 유발하고 포커스 해제
    await userEvent.type(nicknameInput, 'a');
    await userEvent.clear(nicknameInput);
    fireEvent.blur(nicknameInput);

    await waitFor(
      () => {
        // 빈 칸인 경우 어떠한 유효성 에러 메시지도 표출되지 않아야 함
        expect(screen.queryByText('이름을 입력해 주세요.')).not.toBeInTheDocument();
        expect(screen.queryByText('닉네임은 2자 이상이어야 합니다.')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test('닉네임에 특수문자, 공백, 자음/모음 단일 사용 시 에러 메시지를 표시해야 합니다', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} defaultStep="nickname" />, {
      wrapper: createWrapper(),
    });
    const nicknameInput = screen.getByLabelText(/닉네임/);

    // 공백 포함 입력
    await userEvent.type(nicknameInput, 'hello 123');
    fireEvent.blur(nicknameInput);

    await waitFor(
      () => {
        expect(
          screen.getByText('특수문자, 공백, 자음/모음 단일 사용은 불가합니다.')
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // 지우고 단일 자음 입력
    await userEvent.clear(nicknameInput);
    await userEvent.type(nicknameInput, 'ㄱㄴㄷ');
    fireEvent.blur(nicknameInput);

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
    // 모든 단계를 거쳐야 하므로 이메일부터 시작
    render(<SignupForm onSubmit={mockOnSubmit} />, { wrapper: createWrapper() });

    // 1단계: 이메일
    const emailInput = screen.getByLabelText(/이메일/);
    await userEvent.type(emailInput, 'valid@example.com');
    fireEvent.click(screen.getByRole('button', { name: /다음/ }));

    // 2단계: 비밀번호
    await waitFor(() => expect(screen.getByText('비밀번호를 설정하세요')).toBeInTheDocument());
    const passwordInput = screen.getByLabelText(/^비밀번호\*/);
    const confirmInput = screen.getByLabelText(/^비밀번호 확인\*/);
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmInput, 'password123');
    fireEvent.click(screen.getByRole('button', { name: /다음/ }));

    // 3단계: 닉네임
    await waitFor(() => expect(screen.getByText('프로필을 설정하세요')).toBeInTheDocument());
    const nicknameInput = screen.getByLabelText(/닉네임/);
    await userEvent.type(nicknameInput, 'testuser');

    await waitFor(
      () => {
        const submitButton = screen.getByRole('button', { name: '회원가입' });
        expect(submitButton).not.toBeDisabled();
      },
      { timeout: 2000 }
    );

    const submitButton = screen.getByRole('button', { name: '회원가입' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
