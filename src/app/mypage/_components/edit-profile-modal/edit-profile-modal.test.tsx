import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EditProfileModal } from './edit-profile-modal';

describe('EditProfileModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('렌더링', () => {
    it('isOpen이 true일 때 모달이 렌더링된다', () => {
      render(<EditProfileModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('프로필 수정하기')).toBeInTheDocument();
    });

    it('isOpen이 false일 때 모달이 렌더링되지 않는다', () => {
      render(<EditProfileModal isOpen={false} onClose={mockOnClose} />);
      expect(screen.queryByText('프로필 수정하기')).not.toBeInTheDocument();
    });
  });

  describe('초기값', () => {
    it('initialName이 이름 Input의 초기값으로 렌더링된다', () => {
      render(<EditProfileModal isOpen={true} onClose={mockOnClose} initialName="홍길동" />);
      expect(screen.getByLabelText('이름')).toHaveValue('홍길동');
    });

    it('initialEmail이 이메일 Input의 초기값으로 렌더링된다', () => {
      render(
        <EditProfileModal isOpen={true} onClose={mockOnClose} initialEmail="test@example.com" />
      );
      expect(screen.getByLabelText('이메일')).toHaveValue('test@example.com');
    });
  });

  describe('onClose 호출', () => {
    it('닫기(X) 버튼 클릭 시 onClose가 호출된다', async () => {
      const user = userEvent.setup();
      render(<EditProfileModal isOpen={true} onClose={mockOnClose} />);

      await user.click(screen.getByRole('button', { name: '닫기' }));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('취소 버튼 클릭 시 onClose가 호출된다', async () => {
      const user = userEvent.setup();
      render(<EditProfileModal isOpen={true} onClose={mockOnClose} />);

      await user.click(screen.getByRole('button', { name: '취소' }));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('오버레이 클릭 시 onClose가 호출된다', async () => {
      const user = userEvent.setup();
      const { container } = render(<EditProfileModal isOpen={true} onClose={mockOnClose} />);

      const overlay = container.firstChild as HTMLElement;
      await user.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSubmit 호출', () => {
    it('수정하기 버튼 클릭 시 onSubmit이 현재 name, email과 함께 호출된다', async () => {
      const mockOnSubmit = jest.fn();
      const user = userEvent.setup();
      render(
        <EditProfileModal
          isOpen={true}
          onClose={mockOnClose}
          initialName="홍길동"
          initialEmail="test@example.com"
          onSubmit={mockOnSubmit}
        />
      );

      await user.click(screen.getByRole('button', { name: '수정하기' }));
      expect(mockOnSubmit).toHaveBeenCalledWith('홍길동', 'test@example.com');
    });
  });

  describe('입력 상태 관리', () => {
    it('이름 Input에 값을 입력하면 상태가 업데이트된다', async () => {
      const user = userEvent.setup();
      render(<EditProfileModal isOpen={true} onClose={mockOnClose} initialName="홍길동" />);

      const nameInput = screen.getByLabelText('이름');
      await user.clear(nameInput);
      await user.type(nameInput, '김소소');
      expect(nameInput).toHaveValue('김소소');
    });

    it('이메일 Input에 값을 입력하면 상태가 업데이트된다', async () => {
      const user = userEvent.setup();
      render(
        <EditProfileModal isOpen={true} onClose={mockOnClose} initialEmail="old@example.com" />
      );

      const emailInput = screen.getByLabelText('이메일');
      await user.clear(emailInput);
      await user.type(emailInput, 'new@example.com');
      expect(emailInput).toHaveValue('new@example.com');
    });
  });
});
