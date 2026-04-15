import type { MeetingComment } from './meeting-comment-section.types';

function sortCommentsByCreatedAt(a: MeetingComment, b: MeetingComment) {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

function sortRepliesRecursively(comment: MeetingComment): MeetingComment {
  return {
    ...comment,
    replies: (comment.replies ?? []).map(sortRepliesRecursively).sort(sortCommentsByCreatedAt),
  };
}

export function buildCommentTree(flatComments: MeetingComment[]): MeetingComment[] {
  const map = new Map<number, MeetingComment>();
  const roots: MeetingComment[] = [];

  flatComments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  map.forEach((comment) => {
    if (comment.parentId === null) {
      roots.push(comment);
      return;
    }

    const parent = map.get(comment.parentId);
    if (parent) {
      parent.replies = [...(parent.replies ?? []), comment];
    }
  });

  return roots.map(sortRepliesRecursively).sort(sortCommentsByCreatedAt);
}

export function normalizeMeetingCommentTree(comments: MeetingComment[]): MeetingComment[] {
  return comments.map(sortRepliesRecursively).sort(sortCommentsByCreatedAt);
}
