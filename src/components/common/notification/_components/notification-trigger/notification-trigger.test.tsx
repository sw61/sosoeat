import { render, screen } from '@testing-library/react';

import { NotificationTrigger } from './notification-trigger';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) {
    // eslint-disable-next-line @next/next/no-img-element -- Jest mock for next/image
    return <img src={src} alt={alt} width={width} height={height} />;
  },
}));

describe('NotificationTrigger', () => {
  it('알림 열기 라벨과 아이콘 영역이 있다', () => {
    render(<NotificationTrigger />);
    expect(screen.getByRole('button', { name: '알림 열기' })).toBeInTheDocument();
  });

  it('className을 적용한다', () => {
    render(<NotificationTrigger className="custom-trigger" />);
    expect(screen.getByRole('button', { name: '알림 열기' })).toHaveClass('custom-trigger');
  });
});
