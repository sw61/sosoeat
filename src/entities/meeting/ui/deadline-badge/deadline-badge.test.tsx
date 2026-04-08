import React from 'react';

import { render, screen } from '@testing-library/react';

import { useTimeFormatter } from '../../model/use-time-formater';

import { DeadlineBadge } from './deadline-badge';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="deadline-badge-icon" {...rest} />
  ),
}));

jest.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, _key) => {
        return ({ children, ...rest }: { children: React.ReactNode; [key: string]: unknown }) => (
          <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
        );
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../model/use-time-formater', () => ({
  useTimeFormatter: jest.fn(),
}));

describe('DeadlineBadge', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-03-19T10:00:00+09:00'));
    (useTimeFormatter as jest.Mock).mockReturnValue({
      contentText: '모집완료 1일 0시간 남았어요!',
      isEnded: false,
      showCountdown: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('마감 후에는 마감 종료가 표시된다', () => {
    (useTimeFormatter as jest.Mock).mockReturnValue({
      contentText: '',
      isEnded: true,
      showCountdown: false,
    });
    render(
      <DeadlineBadge registrationEnd={new Date('2025-03-18T10:00:00+09:00')} variant="groupEat" />
    );

    expect(screen.getByText('마감 종료')).toBeInTheDocument();
  });

  it('24시간 초과 남으면 일·시간 문구가 표시된다', () => {
    (useTimeFormatter as jest.Mock).mockReturnValue({
      contentText: '모집완료 7일 0시간 남았어요!',
      isEnded: false,
      showCountdown: true,
    });
    render(
      <DeadlineBadge registrationEnd={new Date('2025-03-26T10:00:00+09:00')} variant="groupEat" />
    );

    expect(screen.getByText(/모집완료 7일 0시간 남았어요!/)).toBeInTheDocument();
  });

  it('24시간 이내면 시·분 문구가 표시된다', () => {
    (useTimeFormatter as jest.Mock).mockReturnValue({
      contentText: '모집완료 1시간 0분 남았어요!',
      isEnded: false,
      showCountdown: true,
    });
    render(
      <DeadlineBadge registrationEnd={new Date('2025-03-20T08:00:00+09:00')} variant="groupBuy" />
    );

    expect(screen.getByText(/모집완료 \d+시간 \d+분 남았어요!/)).toBeInTheDocument();
  });

  it('groupEat이면 eat용 알람 아이콘을 쓴다', () => {
    render(
      <DeadlineBadge registrationEnd={new Date('2025-03-26T10:00:00+09:00')} variant="groupEat" />
    );

    expect(screen.getByTestId('deadline-badge-icon')).toHaveAttribute(
      'src',
      '/icons/alarm-clock-eat.svg'
    );
  });

  it('groupBuy이면 buy용 알람 아이콘을 쓴다', () => {
    render(
      <DeadlineBadge registrationEnd={new Date('2025-03-26T10:00:00+09:00')} variant="groupBuy" />
    );

    expect(screen.getByTestId('deadline-badge-icon')).toHaveAttribute(
      'src',
      '/icons/alarm-clock-buy.svg'
    );
  });
});
