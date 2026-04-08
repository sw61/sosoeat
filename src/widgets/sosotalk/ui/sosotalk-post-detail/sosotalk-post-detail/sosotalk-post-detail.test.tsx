import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkPostDetail } from './sosotalk-post-detail';

describe('SosoTalkPostDetail', () => {
  it('props로 받은 액션 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const onLikeClick = jest.fn();
    const onCommentClick = jest.fn();
    const onShareClick = jest.fn();

    render(
      <SosoTalkPostDetail
        title="마포 고깃집 같이 가실 분?"
        contentHtml="<p>본문입니다.</p>"
        authorName="김민수"
        createdAt="6시간 전"
        likeCount={24}
        commentCount={3}
        onLikeClick={onLikeClick}
        onCommentClick={onCommentClick}
        onShareClick={onShareClick}
        comments={[]}
        inputValue=""
        onChangeInput={() => undefined}
        onSubmitComment={() => undefined}
        currentUserName="마루준"
      />
    );

    await user.click(screen.getByRole('button', { name: '좋아요 24개' }));
    await user.click(screen.getByRole('button', { name: '댓글 3개' }));
    await user.click(screen.getByRole('button', { name: '공유' }));

    expect(onLikeClick).toHaveBeenCalledTimes(1);
    expect(onCommentClick).toHaveBeenCalledTimes(1);
    expect(onShareClick).toHaveBeenCalledTimes(1);
  });

  it('댓글과 입력창을 함께 렌더링한다', () => {
    render(
      <SosoTalkPostDetail
        title="마포 고깃집 같이 가실 분?"
        contentHtml="<p><strong>삼겹살</strong> 드실 분 구해요</p>"
        authorName="김민수"
        createdAt="6시간 전"
        likeCount={24}
        commentCount={1}
        comments={[
          {
            id: '1',
            authorName: '박지수',
            createdAt: '03월 18일 18:54',
            content: '저도 관심 있습니다.',
          },
        ]}
        inputValue=""
        inputPlaceholder="댓글을 입력해 주세요"
        onChangeInput={() => undefined}
        onSubmitComment={() => undefined}
        currentUserName="마루준"
      />
    );

    expect(screen.getByText('삼겹살', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('박지수')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('댓글을 입력해 주세요')).toBeInTheDocument();
  });
});
