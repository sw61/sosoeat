import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DetailDatePicker } from '@/components/common/date-picker/detail-date-picker';

describe('DetailDatePicker', () => {
  describe('렌더링', () => {
    it('날짜 전체 트리거 버튼이 렌더링된다', () => {
      const onChange = jest.fn();
      render(<DetailDatePicker value={null} onChange={onChange} />);

      expect(screen.getByRole('button', { name: /날짜 전체/ })).toBeInTheDocument();
    });

    it('선택된 날짜가 있으면 트리거에 yyyy-MM-dd가 표시된다', () => {
      const onChange = jest.fn();
      render(<DetailDatePicker value={new Date(2026, 2, 15)} onChange={onChange} />);

      expect(screen.getByRole('button', { name: /2026-03-15/ })).toBeInTheDocument();
    });

    it("variant='groupEat'일 때 groupEat 스타일이 적용된다", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<DetailDatePicker variant="groupEat" value={null} onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: /날짜 전체/ }));

      const applyButton = screen.getByRole('button', { name: '적용' });
      expect(applyButton).toHaveClass('bg-sosoeat-orange-600');
    });

    it("variant='groupBuy'일 때 groupBuy 스타일이 적용된다", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<DetailDatePicker variant="groupBuy" value={null} onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: /날짜 전체/ }));

      const applyButton = screen.getByRole('button', { name: '적용' });
      expect(applyButton).toHaveClass('bg-sosoeat-blue-500');
    });
  });

  describe('인터랙션', () => {
    it('트리거 클릭 시 초기화/적용 버튼이 표시된다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<DetailDatePicker value={null} onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: /날짜 전체/ }));

      expect(screen.getByRole('button', { name: '초기화' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '적용' })).toBeInTheDocument();
    });

    it('초기화 클릭 시 onChange가 null로 호출된다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<DetailDatePicker value={null} onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: /날짜 전체/ }));
      await user.click(screen.getByRole('button', { name: '초기화' }));

      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('적용 클릭 시 onChange가 호출되고 팝오버가 닫힌다', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<DetailDatePicker value={null} onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: /날짜 전체/ }));
      await user.click(screen.getByRole('button', { name: '적용' }));

      expect(onChange).toHaveBeenCalled();
      expect(screen.queryByRole('button', { name: '초기화' })).not.toBeInTheDocument();
    });
  });
});
