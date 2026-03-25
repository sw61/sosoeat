import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NotificationDialog } from './notification-dialog';

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

describe('NotificationDialog', () => {
  it('열었을 때 패널과 주입한 list가 보인다', async () => {
    const user = userEvent.setup();
    render(<NotificationDialog list={<p data-testid="injected">주입 목록</p>} />);

    await user.click(screen.getByRole('button', { name: '알림 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('injected')).toHaveTextContent('주입 목록');
    expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
  });
});
