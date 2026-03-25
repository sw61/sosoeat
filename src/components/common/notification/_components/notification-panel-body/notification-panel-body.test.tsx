import { render, screen } from '@testing-library/react';

import { NotificationPanelBody } from './notification-panel-body';

describe('NotificationPanelBody', () => {
  it('제목과 목록 슬롯을 렌더한다', () => {
    render(
      <NotificationPanelBody
        titleId="notification-title"
        listScrollClassName="scroll-area"
        list={<p>목록 항목</p>}
      />
    );

    const heading = screen.getByRole('heading', { name: '알림 내역' });
    expect(heading).toHaveAttribute('id', 'notification-title');
    expect(screen.getByText('목록 항목')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
  });
});
