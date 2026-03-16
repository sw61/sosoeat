import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

describe('Input', () => {
  // 렌더링
  describe('렌더링', () => {
    it('기본 input이 렌더링된다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('label이 input과 연결된다', () => {
      render(<Input label="이메일" />);
      expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    });

    it('required label에 * 표시가 된다', () => {
      render(<Input label="이메일" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('placeholder가 렌더링된다', () => {
      render(<Input placeholder="이메일을 입력하세요" />);
      expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument();
    });

    it('rightAddon이 렌더링된다', () => {
      render(<Input rightAddon={<span data-testid="eye-icon">👁</span>} />);
      expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    });
  });

  // 에러 메시지
  describe('에러 메시지', () => {
    it('errorMessage가 표시된다', () => {
      render(<Input errorMessage="이메일 형식이 올바르지 않습니다" />);
      expect(screen.getByRole('alert')).toHaveTextContent('이메일 형식이 올바르지 않습니다');
    });

    it('errorMessage가 있으면 aria-invalid="true"가 설정된다', () => {
      render(<Input errorMessage="에러" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('errorMessage가 없으면 aria-invalid="false"가 설정된다', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });

    it('errorMessage가 있으면 aria-describedby가 에러 id를 가리킨다', () => {
      render(<Input id="test" errorMessage="에러 발생" />);
      const input = screen.getByRole('textbox');
      const errorEl = document.getElementById(input.getAttribute('aria-describedby')!);
      expect(errorEl).toHaveTextContent('에러 발생');
    });
  });

  // 이벤트
  describe('이벤트', () => {
    it('텍스트 입력 시 onChange가 호출된다', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('onFocus, onBlur 이벤트가 호출된다', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

      await user.click(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // ref
  describe('ref 전달', () => {
    it('forwardRef로 전달된 ref가 input 요소에 연결된다', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});
