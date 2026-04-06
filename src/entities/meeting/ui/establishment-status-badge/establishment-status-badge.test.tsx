import { render, screen } from '@testing-library/react';

import { EstablishmentStatusBadge } from '@/entities/meeting/ui/establishment-status-badge/establishment-status-badge';

describe('EstablishmentStatusBadge', () => {
  it('confirmedAt이 없으면 개설대기가 표시된다', () => {
    render(<EstablishmentStatusBadge confirmedAt={null} variant="groupEat" />);

    expect(screen.getByText('개설대기')).toBeInTheDocument();
  });

  it('confirmedAt이 있으면 개설확정이 표시된다', () => {
    render(
      <EstablishmentStatusBadge confirmedAt={new Date('2025-03-22T12:00:00')} variant="groupEat" />
    );

    expect(screen.getByText('개설확정')).toBeInTheDocument();
  });

  it('groupBuy variant에서도 개설대기가 표시된다', () => {
    render(<EstablishmentStatusBadge confirmedAt={null} variant="groupBuy" />);

    expect(screen.getByText('개설대기')).toBeInTheDocument();
  });

  it('groupBuy variant에서도 개설확정이 표시된다', () => {
    render(
      <EstablishmentStatusBadge confirmedAt={new Date('2025-03-22T12:00:00')} variant="groupBuy" />
    );

    expect(screen.getByText('개설확정')).toBeInTheDocument();
  });
});
