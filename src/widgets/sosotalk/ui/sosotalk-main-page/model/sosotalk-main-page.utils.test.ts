import { createSosoTalkMainPageQueryParams } from './sosotalk-main-page.utils';

describe('createSosoTalkMainPageQueryParams', () => {
  it('인기 탭과 댓글 정렬 조합을 목록 쿼리 파라미터로 변환한다', () => {
    expect(createSosoTalkMainPageQueryParams('popular', 'comments')).toEqual({
      type: 'best',
      sortBy: 'commentCount',
      sortOrder: 'desc',
      size: 10,
    });
  });

  it('전체 탭과 최신 정렬 조합을 목록 쿼리 파라미터로 변환한다', () => {
    expect(createSosoTalkMainPageQueryParams('all', 'latest')).toEqual({
      type: 'all',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      size: 10,
    });
  });
});
