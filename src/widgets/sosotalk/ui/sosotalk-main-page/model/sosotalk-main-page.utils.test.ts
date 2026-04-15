import { createSosoTalkMainPageQueryParams } from './sosotalk-main-page.utils';

describe('createSosoTalkMainPageQueryParams', () => {
  it('인기 탭과 댓글순 정렬 조합을 목록 쿼리 파라미터로 변환한다', () => {
    expect(createSosoTalkMainPageQueryParams('popular', 'comments')).toEqual({
      type: 'best',
      sortBy: 'commentCount',
      sortOrder: 'desc',
      size: 12,
    });
  });

  it('전체 탭과 최신순 정렬 조합을 목록 쿼리 파라미터로 변환한다', () => {
    expect(createSosoTalkMainPageQueryParams('all', 'latest')).toEqual({
      type: 'all',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      size: 12,
    });
  });

  it('전체 탭과 좋아요순 정렬 조합을 목록 쿼리 파라미터로 변환한다', () => {
    expect(createSosoTalkMainPageQueryParams('all', 'likes')).toEqual({
      type: 'all',
      sortBy: 'likeCount',
      sortOrder: 'desc',
      size: 12,
    });
  });
});
