import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkPostDetailPage } from './sosotalk-post-detail-page';

jest.mock('@/components/common/navigation-bar', () => ({
  NavigationBar: () => <div>NavigationBar</div>,
}));

jest.mock('@/components/common/footer', () => ({
  Footer: () => <div>Footer</div>,
}));

describe('SosoTalkPostDetailPage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/sosotalk/1');

    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    });

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('댓글 버튼을 누르면 댓글 섹션으로 스크롤한다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage />);

    await user.click(screen.getByRole('button', { name: '댓글 6개' }));

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('좋아요 버튼을 누르면 좋아요 수가 증가한다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage />);

    await user.click(screen.getByRole('button', { name: '좋아요 24개' }));

    expect(screen.getByRole('button', { name: '좋아요 25개' })).toBeInTheDocument();
  });
});
