import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchBar } from './search-bar';

const defaultPlaceholder = '모임 검색 (제목, 태그, 지역 등)';

function SearchBarHarness({ onChangeSpy }: { onChangeSpy?: (value: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <SearchBar
      value={value}
      onChange={(next) => {
        setValue(next);
        onChangeSpy?.(next);
      }}
    />
  );
}

describe('SearchBar', () => {
  it('검색 입력과 기본 플레이스홀더가 표시된다', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    expect(screen.getByPlaceholderText(defaultPlaceholder)).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: defaultPlaceholder })).toBeInTheDocument();
  });

  it('className이 루트 컨테이너에 적용된다', () => {
    const { container } = render(
      <SearchBar value="" onChange={() => {}} className="search-bar-root-test" />
    );

    expect(container.firstChild).toHaveClass('search-bar-root-test');
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('search input에 전체 너비 스타일과 내부 여백이 적용된다', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const input = screen.getByRole('searchbox', { name: defaultPlaceholder });
    expect(input).toHaveClass('w-full', 'pl-10', 'rounded-[14px]');
  });

  it('입력하면 값이 반영되고 onChange가 호출된다', async () => {
    const user = userEvent.setup();
    const onChangeSpy = jest.fn();
    render(<SearchBarHarness onChangeSpy={onChangeSpy} />);

    const input = screen.getByPlaceholderText(defaultPlaceholder);
    await user.type(input, '테스트');

    expect(input).toHaveValue('테스트');
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenLastCalledWith('테스트');
  });

  it('error prop이 있으면 에러 메시지가 표시된다', () => {
    render(<SearchBar value="" onChange={() => {}} error="2글자 이상 입력해주세요" />);

    expect(screen.getByText('2글자 이상 입력해주세요')).toBeInTheDocument();
  });

  it('error prop이 없으면 에러 메시지가 표시되지 않는다', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    expect(screen.queryByText('2글자 이상 입력해주세요')).not.toBeInTheDocument();
  });
});
