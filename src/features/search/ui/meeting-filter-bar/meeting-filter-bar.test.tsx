import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MeetingFilterBar } from './meeting-filter-bar';
import type { MeetingFilterBarProps } from './meeting-filter-bar.types';

const defaultProps: Pick<
  MeetingFilterBarProps,
  'dateStart' | 'dateEnd' | 'regionCommitted' | 'typeFilter' | 'sortBy' | 'sortOrder'
> = {
  dateStart: null,
  dateEnd: null,
  regionCommitted: null,
  typeFilter: 'all',
  sortBy: 'participantCount',
  sortOrder: 'desc',
};

describe('MeetingFilterBar', () => {
  it('모임 유형 필터와 지역 버튼을 렌더링한다', () => {
    render(<MeetingFilterBar {...defaultProps} />);

    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('함께먹기')).toBeInTheDocument();
    expect(screen.getByText('공동구매')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '지역 전체' })).toBeInTheDocument();
  });

  it('className을 루트 컨테이너에 적용한다', () => {
    const { container } = render(
      <MeetingFilterBar {...defaultProps} className="filter-bar-test" />
    );

    expect(container.firstChild).toHaveClass('filter-bar-test');
  });

  it('지역 버튼을 누르면 지역 선택 다이얼로그가 열린다', async () => {
    const user = userEvent.setup();
    render(<MeetingFilterBar {...defaultProps} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '지역 전체' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '지역' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: '시·도 목록' })).toBeInTheDocument();
  });
});
