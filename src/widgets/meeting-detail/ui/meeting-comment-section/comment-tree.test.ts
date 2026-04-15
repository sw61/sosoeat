import { buildCommentTree, normalizeMeetingCommentTree } from './comment-tree';
import type { MeetingComment } from './meeting-comment-section.types';

const createComment = (overrides: Partial<MeetingComment>): MeetingComment => ({
  id: 1,
  parentId: null,
  content: 'comment',
  isDeleted: false,
  createdAt: '2026-04-15T10:00:00.000Z',
  author: {
    nickname: '소소',
    profileUrl: null,
  },
  likeCount: 0,
  isLiked: false,
  isHostComment: false,
  isMine: false,
  replies: [],
  ...overrides,
});

describe('buildCommentTree', () => {
  it('sorts root comments from oldest to newest', () => {
    const tree = buildCommentTree([
      createComment({ id: 2, createdAt: '2026-04-15T12:00:00.000Z' }),
      createComment({ id: 1, createdAt: '2026-04-15T09:00:00.000Z' }),
    ]);

    expect(tree.map((comment) => comment.id)).toEqual([1, 2]);
  });

  it('sorts replies from oldest to newest within the same parent', () => {
    const tree = buildCommentTree([
      createComment({ id: 10, parentId: null, createdAt: '2026-04-15T08:00:00.000Z' }),
      createComment({
        id: 12,
        parentId: 10,
        createdAt: '2026-04-15T12:00:00.000Z',
        content: 'latest reply',
      }),
      createComment({
        id: 11,
        parentId: 10,
        createdAt: '2026-04-15T09:00:00.000Z',
        content: 'early reply',
      }),
    ]);

    expect(tree[0]?.replies?.map((reply) => reply.id)).toEqual([11, 12]);
  });
});

describe('normalizeMeetingCommentTree', () => {
  it('sorts nested replies from oldest to newest when comments are already tree-shaped', () => {
    const normalized = normalizeMeetingCommentTree([
      createComment({
        id: 10,
        createdAt: '2026-04-15T08:00:00.000Z',
        replies: [
          createComment({
            id: 12,
            parentId: 10,
            createdAt: '2026-04-15T12:00:00.000Z',
            content: 'latest reply',
          }),
          createComment({
            id: 11,
            parentId: 10,
            createdAt: '2026-04-15T09:00:00.000Z',
            content: 'early reply',
          }),
        ],
      }),
    ]);

    expect(normalized[0]?.replies?.map((reply) => reply.id)).toEqual([11, 12]);
  });
});
