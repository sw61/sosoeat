import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkPostEditor } from './sosotalk-post-editor';
import {
  SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH,
  SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH,
} from './sosotalk-post-editor.constants';

beforeEach(() => {
  document.execCommand = jest.fn();
  document.queryCommandState = jest.fn().mockReturnValue(false);
});

describe('SosoTalkPostEditor', () => {
  it('제목은 최대 30자까지만 입력된다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostEditor />);

    const titleInput = screen.getByLabelText('게시글 제목');
    const longTitle = '가'.repeat(SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH + 5);

    await user.type(titleInput, longTitle);

    expect(titleInput).toHaveValue('가'.repeat(SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH));
  });

  it('제목과 본문 초기값이 모두 있으면 등록 버튼이 활성화된다', () => {
    render(
      <SosoTalkPostEditor initialTitle="모임 추천 부탁드립니다" initialContent="본문 내용입니다." />
    );

    expect(screen.getByRole('button', { name: '등록' })).not.toBeDisabled();
  });

  it('초기 이미지가 있으면 삭제 버튼으로 제거할 수 있다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostEditor initialImageUrl="https://example.com/image.jpg" />);

    expect(screen.getByAltText('업로드한 이미지')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '업로드한 이미지 삭제' }));

    expect(screen.queryByAltText('업로드한 이미지')).not.toBeInTheDocument();
  });

  it('본문 공백 포함 글자 수 제한을 넘기면 마지막 유효 상태를 유지한다', () => {
    render(
      <SosoTalkPostEditor initialContent={'가'.repeat(SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH)} />
    );

    const editor = screen.getByRole('textbox');

    editor.innerHTML = `<p>${'가'.repeat(SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH + 1)}</p>`;
    fireEvent.input(editor);

    expect(
      screen.getByText(new RegExp(`공백포함 : 총 ${SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH}자`))
    ).toBeInTheDocument();
  });
});
