import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AlertModal } from './alert-modal';

const DEFAULT_PROPS = {
  open: true,
  title: '로그인이 필요한 서비스입니다.',
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
};

beforeEach(() => {
  DEFAULT_PROPS.onCancel = jest.fn();
  DEFAULT_PROPS.onConfirm = jest.fn();
});

describe('AlertModal', () => {
  describe('렌더링', () => {
    it('open이 true일 때 모달이 렌더링된다', () => {
      render(<AlertModal {...DEFAULT_PROPS} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('open이 false일 때 모달이 렌더링되지 않는다', () => {
      render(<AlertModal {...DEFAULT_PROPS} open={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('지정된 title이 올바르게 표시된다', () => {
      render(<AlertModal {...DEFAULT_PROPS} title="커스텀 타이틀" />);
      expect(screen.getByText('커스텀 타이틀')).toBeInTheDocument();
    });

    it('description prop을 전달하면 설명 문구가 렌더링된다', () => {
      render(<AlertModal {...DEFAULT_PROPS} description="부가적인 설명입니다." />);
      expect(screen.getByText('부가적인 설명입니다.')).toBeInTheDocument();
    });

    it('description prop이 없으면 설명 문구가 렌더링되지 않는다', () => {
      render(<AlertModal {...DEFAULT_PROPS} />);
      expect(screen.queryByText('부가적인 설명입니다.')).not.toBeInTheDocument();
    });

    it('기본 취소/확인 버튼 텍스트가 표시된다', () => {
      render(<AlertModal {...DEFAULT_PROPS} />);
      expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    });

    it('cancelText, confirmText prop으로 버튼 텍스트를 오버라이드할 수 있다', () => {
      render(<AlertModal {...DEFAULT_PROPS} cancelText="아니오" confirmText="네, 지울래요" />);
      expect(screen.getByRole('button', { name: '아니오' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '네, 지울래요' })).toBeInTheDocument();
    });
  });

  describe('버튼 동작', () => {
    it('취소 버튼 클릭 시 onCancel 콜백이 호출된다', async () => {
      const user = userEvent.setup();
      render(<AlertModal {...DEFAULT_PROPS} cancelText="닫기" />);

      await user.click(screen.getByRole('button', { name: '닫기' }));
      expect(DEFAULT_PROPS.onCancel).toHaveBeenCalledTimes(1);
      expect(DEFAULT_PROPS.onConfirm).not.toHaveBeenCalled();
    });

    it('확인 버튼 클릭 시 onConfirm 콜백이 호출되고, 모달을 닫기 위해 onCancel 도 연이어 호출된다', async () => {
      const user = userEvent.setup();
      render(<AlertModal {...DEFAULT_PROPS} confirmText="진행" />);

      await user.click(screen.getByRole('button', { name: '진행' }));
      expect(DEFAULT_PROPS.onConfirm).toHaveBeenCalledTimes(1);
      expect(DEFAULT_PROPS.onCancel).toHaveBeenCalledTimes(1); // 모달 자동 닫기 설계 반영
    });
  });

  describe('dismissible 옵션', () => {
    it('dismissible이 true(기본값)일 때 ESC 키 입력 시 onCancel이 호출된다', async () => {
      const user = userEvent.setup();
      render(<AlertModal {...DEFAULT_PROPS} dismissible={true} />);

      await user.keyboard('{Escape}');
      expect(DEFAULT_PROPS.onCancel).toHaveBeenCalledTimes(1);
    });

    it('dismissible이 false일 때 ESC 키 입력해도 onCancel이 호출되지 않는다', async () => {
      const user = userEvent.setup();
      render(<AlertModal {...DEFAULT_PROPS} dismissible={false} />);

      await user.keyboard('{Escape}');
      expect(DEFAULT_PROPS.onCancel).not.toHaveBeenCalled();
    });

    it('dismissible이 true일 때 닫기(X) 버튼 클릭 시 onCancel이 호출된다', async () => {
      const user = userEvent.setup();
      render(<AlertModal {...DEFAULT_PROPS} />);

      // shadcn DialogContent의 Close 버튼은 sr-only 텍스트 "Close"를 가짐
      const closeBtn = screen.getByRole('button', { name: /close/i });
      await user.click(closeBtn);

      expect(DEFAULT_PROPS.onCancel).toHaveBeenCalledTimes(1);
    });

    it('dismissible이 true일 때 오버레이(배경) 클릭 시 onCancel이 호출된다', async () => {
      const user = userEvent.setup();
      render(<AlertModal {...DEFAULT_PROPS} />);

      // Radix UI Dialog의 overlay는 보통 특정 role이 없으므로, data-slot이나 배경 요소를 찾아야 함
      // 또는 모달 외부를 클릭하는 이벤트를 시뮬레이션
      const overlay = document.querySelector('[data-slot="dialog-overlay"]');
      if (overlay) {
        await user.click(overlay);
        expect(DEFAULT_PROPS.onCancel).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('접근성', () => {
    it('모달에 role="dialog"와 aria-modal="true" 속성이 적용된다', () => {
      render(<AlertModal {...DEFAULT_PROPS} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('취소 버튼에 고유한 id가 부여된다', () => {
      render(<AlertModal {...DEFAULT_PROPS} />);
      expect(document.getElementById('alert-modal-cancel-btn')).toBeInTheDocument();
    });

    it('확인 버튼에 고유한 id가 부여된다', () => {
      render(<AlertModal {...DEFAULT_PROPS} />);
      expect(document.getElementById('alert-modal-confirm-btn')).toBeInTheDocument();
    });

    it('키보드만으로 취소/확인 버튼에 포커스 가능하고 엔터키로 동작한다', async () => {
      const user = userEvent.setup();
      render(<AlertModal {...DEFAULT_PROPS} />);

      const cancelBtn = screen.getByRole('button', { name: '취소' });
      const confirmBtn = screen.getByRole('button', { name: '확인' });

      cancelBtn.focus();
      await user.keyboard('{Enter}');
      expect(DEFAULT_PROPS.onCancel).toHaveBeenCalledTimes(1);

      confirmBtn.focus();
      await user.keyboard('{Enter}');
      expect(DEFAULT_PROPS.onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
