import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkPostEditor } from './sosotalk-post-editor';
import {
  SOSOTALK_POST_EDITOR_CONTENT_MAX_LENGTH,
  SOSOTALK_POST_EDITOR_TITLE_MAX_LENGTH,
} from './sosotalk-post-editor.constants';

beforeEach(() => {
  document.execCommand = jest.fn();
  document.queryCommandState = jest.fn().mockReturnValue(false);
  URL.createObjectURL = jest.fn().mockReturnValue('blob:preview-image');
  URL.revokeObjectURL = jest.fn();
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

  it('제목이나 본문이 비어 있으면 등록되지 않는다', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SosoTalkPostEditor onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: '등록' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('등록 시 작성한 내용이 onSubmit payload로 전달된다', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <SosoTalkPostEditor
        initialTitle="모임 추천 부탁드립니다"
        initialContent={'안녕하세요.\n\n같이 식사하실 분 계실까요?'}
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByRole('button', { name: '등록' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: '모임 추천 부탁드립니다',
      contentHtml: '<p>안녕하세요.</p><p><br></p><p>같이 식사하실 분 계실까요?</p>',
      contentText: '안녕하세요.\n\n같이 식사하실 분 계실까요?',
      imageFile: null,
      imagePreviewUrl: '',
    });
  });

  it('이미지 파일을 선택하면 미리보기가 표시된다', async () => {
    const file = new File(['image'], 'dog.png', { type: 'image/png' });
    const { container } = render(<SosoTalkPostEditor />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText('dog.png')).toBeInTheDocument();
    });

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('이미지 추가 버튼을 누르면 파일 선택창이 열린다', async () => {
    const user = userEvent.setup();
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});

    render(<SosoTalkPostEditor />);

    await user.click(screen.getByRole('button', { name: '이미지 추가' }));

    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockRestore();
  });

  it('초기값이 바뀌면 에디터 상태가 함께 동기화된다', () => {
    const { container, rerender } = render(
      <SosoTalkPostEditor
        initialTitle="첫 번째 제목"
        initialContent="첫 번째 본문"
        initialImageUrl="https://example.com/first.jpg"
      />
    );

    rerender(
      <SosoTalkPostEditor
        initialTitle="두 번째 제목"
        initialContent="두 번째 본문"
        initialImageUrl="https://example.com/second.jpg"
      />
    );

    const editor = container.querySelector('[contenteditable="true"]');

    return waitFor(() => {
      expect(screen.getByLabelText('게시글 제목')).toHaveValue('두 번째 제목');
      expect(editor).toHaveTextContent('두 번째 본문');
      expect(screen.getByAltText('업로드한 이미지')).toHaveAttribute(
        'src',
        expect.stringContaining('https://example.com/second.jpg')
      );
    });
  });
});
