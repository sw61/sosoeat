import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NotificationPopover } from './notification-popover';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) {
    // eslint-disable-next-line @next/next/no-img-element -- Jest mock for next/image
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  },
}));

describe('NotificationPopover', () => {
  it('열었을 때 주입한 list가 보인다', async () => {
    const user = userEvent.setup();
    render(<NotificationPopover list={<span data-testid="popover-list">팝오버 목록</span>} />);

    await user.click(screen.getByRole('button', { name: '알림 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('popover-list')).toHaveTextContent('팝오버 목록');
  });
});
