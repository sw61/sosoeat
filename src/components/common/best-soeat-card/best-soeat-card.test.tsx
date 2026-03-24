import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BestSoeatCard } from './best-soeat-card';

const DEFAULT_PROPS = {
  title: '강남 고기집 같이 가실 분!',
  region: '서울 강남구',
  meetingAt: '3/15(일) 18:30',
};

describe('BestSoeatCard', () => {
  it('제목, 지역, 날짜가 렌더링된다', () => {
    render(<BestSoeatCard {...DEFAULT_PROPS} />);

    expect(screen.getByText('강남 고기집 같이 가실 분!')).toBeInTheDocument();
    expect(screen.getByText('서울 강남구')).toBeInTheDocument();
    expect(screen.getByText('3/15(일) 18:30')).toBeInTheDocument();
  });

  it('thumbnailUrl 제공 시 이미지가 렌더링된다', () => {
    render(
      <BestSoeatCard
        {...DEFAULT_PROPS}
        thumbnailUrl="https://example.com/food.jpg"
        thumbnailAlt="음식 사진"
      />
    );

    expect(screen.getByAltText('음식 사진')).toBeInTheDocument();
  });

  it('thumbnailAlt 미제공 시 기본값 "모임 이미지"가 사용된다', () => {
    render(<BestSoeatCard {...DEFAULT_PROPS} thumbnailUrl="https://example.com/food.jpg" />);

    expect(screen.getByAltText('모임 이미지')).toBeInTheDocument();
  });

  it('onClick 제공 시 클릭 이벤트가 호출된다', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BestSoeatCard {...DEFAULT_PROPS} onClick={handleClick} />);

    await user.click(container.firstChild as HTMLElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
