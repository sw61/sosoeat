import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { LikedMeetingBadge } from './liked-meeting-badge';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const mockUseQuery = useQuery as jest.Mock;

describe('LikedMeetingBadge', () => {
  it('로딩 중에는 아무것도 렌더링되지 않는다', () => {
    mockUseQuery.mockReturnValue({ data: undefined, isLoading: true });

    const { container } = render(<LikedMeetingBadge />);
    expect(container).toBeEmptyDOMElement();
  });

  it('카운트가 렌더링된다', () => {
    mockUseQuery.mockReturnValue({ data: 5, isLoading: false });

    render(<LikedMeetingBadge />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('카운트가 0일 때 0이 렌더링된다', () => {
    mockUseQuery.mockReturnValue({ data: 0, isLoading: false });

    render(<LikedMeetingBadge />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('데이터 없을 때 기본값 0이 렌더링된다', () => {
    mockUseQuery.mockReturnValue({ data: undefined, isLoading: false });

    render(<LikedMeetingBadge />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('배지에 올바른 스타일이 적용된다', () => {
    mockUseQuery.mockReturnValue({ data: 3, isLoading: false });

    render(<LikedMeetingBadge />);
    const badge = screen.getByText('3');
    expect(badge).toHaveClass('rounded-full', 'bg-sosoeat-orange-600', 'text-white');
  });
});
