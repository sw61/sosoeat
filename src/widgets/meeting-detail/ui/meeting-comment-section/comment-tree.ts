// flat 구조인 comments 배열을 tree 구조로 변환하는 함수
import type { MeetingComment } from './meeting-comment-section.types';

export function buildCommentTree(flatComments: MeetingComment[]): MeetingComment[] {
  const map = new Map<number, MeetingComment>();

  const roots: MeetingComment[] = [];

  flatComments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  map.forEach((comment) => {
    if (comment.parentId === null) {
      roots.push(comment);
    } else {
      const parent = map.get(comment.parentId);
      if (parent) {
        parent.replies = [...(parent.replies ?? []), comment];
      }
    }
  });

  return roots;
}
