import { fetchClient } from '@/lib/http/fetch-client';
import { CommentFromJSON } from '@/types/generated-client/models/Comment';
import { PostLikeFromJSON } from '@/types/generated-client/models/PostLike';
import { PostListFromJSON } from '@/types/generated-client/models/PostList';
import { PostWithAuthorFromJSON } from '@/types/generated-client/models/PostWithAuthor';
import { PostWithCommentsFromJSON } from '@/types/generated-client/models/PostWithComments';
import {
  PresignedUrlRequestContentTypeEnum,
  PresignedUrlRequestFolderEnum,
} from '@/types/generated-client/models/PresignedUrlRequest';
import { PresignedUrlResponseFromJSON } from '@/types/generated-client/models/PresignedUrlResponse';
import { TeamIdMeetingsMeetingIdDelete200ResponseFromJSON } from '@/types/generated-client/models/TeamIdMeetingsMeetingIdDelete200Response';

import type {
  CommentMutationParams,
  CreateSosoTalkCommentParams,
  CreateSosoTalkCommentResponse,
  CreateSosoTalkPostLikeResponse,
  CreateSosoTalkPostParams,
  CreateSosoTalkPostResponse,
  DeleteSosoTalkCommentResponse,
  DeleteSosoTalkPostLikeResponse,
  DeleteSosoTalkPostResponse,
  GetSosoTalkPostDetailResponse,
  GetSosoTalkPostListParams,
  GetSosoTalkPostListResponse,
  RequestSosoTalkPostImageUploadUrlResponse,
  SosoTalkPostMutationParams,
  UpdateSosoTalkCommentParams,
  UpdateSosoTalkCommentResponse,
  UpdateSosoTalkPostParams,
  UpdateSosoTalkPostResponse,
} from './sosotalk.types';

const DEFAULT_SOSOTALK_POST_LIST_PARAMS: Required<
  Pick<GetSosoTalkPostListParams, 'type' | 'sortBy' | 'sortOrder' | 'size'>
> = {
  type: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  size: 10,
};

const SUPPORTED_SOSOTALK_IMAGE_CONTENT_TYPES = {
  'image/jpeg': PresignedUrlRequestContentTypeEnum.ImageJpeg,
  'image/png': PresignedUrlRequestContentTypeEnum.ImagePng,
  'image/webp': PresignedUrlRequestContentTypeEnum.ImageWebp,
  'image/gif': PresignedUrlRequestContentTypeEnum.ImageGif,
} as const;

const getSosoTalkImageContentType = (file: File) => {
  const contentType =
    SUPPORTED_SOSOTALK_IMAGE_CONTENT_TYPES[
      file.type as keyof typeof SUPPORTED_SOSOTALK_IMAGE_CONTENT_TYPES
    ];

  if (!contentType) {
    throw new Error('지원하지 않는 이미지 형식입니다.');
  }

  return contentType;
};

export const getSosoTalkPostList = async (
  params: GetSosoTalkPostListParams = {}
): Promise<GetSosoTalkPostListResponse> => {
  const mergedParams = {
    ...DEFAULT_SOSOTALK_POST_LIST_PARAMS,
    ...params,
  };
  const searchParams = new URLSearchParams();

  Object.entries(mergedParams).forEach(([key, value]) => {
    if (value == null) {
      return;
    }

    searchParams.set(key, String(value));
  });

  const response = await fetchClient.get(`/posts?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('소소톡 게시글 목록을 불러오지 못했습니다.');
  }

  return PostListFromJSON(await response.json()) as GetSosoTalkPostListResponse;
};

export const getSosoTalkPostDetail = async (
  postId: number
): Promise<GetSosoTalkPostDetailResponse> => {
  const response = await fetchClient.get(`/posts/${postId}`);

  if (!response.ok) {
    throw new Error('소소톡 게시글을 불러오지 못했습니다.');
  }

  return PostWithCommentsFromJSON(await response.json()) as GetSosoTalkPostDetailResponse;
};

export const createSosoTalkPost = async ({
  payload,
}: CreateSosoTalkPostParams): Promise<CreateSosoTalkPostResponse> => {
  const response = await fetchClient.post('/posts', payload);

  if (!response.ok) {
    throw new Error('소소톡 게시글 작성에 실패했습니다.');
  }

  return PostWithAuthorFromJSON(await response.json()) as CreateSosoTalkPostResponse;
};

export const requestSosoTalkPostImageUploadUrl = async (
  file: File
): Promise<RequestSosoTalkPostImageUploadUrlResponse> => {
  const response = await fetchClient.post('/images', {
    fileName: file.name,
    contentType: getSosoTalkImageContentType(file),
    folder: PresignedUrlRequestFolderEnum.Posts,
  });

  if (!response.ok) {
    throw new Error('소소톡 이미지 업로드 URL 발급에 실패했습니다.');
  }

  return PresignedUrlResponseFromJSON(
    await response.json()
  ) as RequestSosoTalkPostImageUploadUrlResponse;
};

export const uploadSosoTalkPostImage = async (file: File): Promise<string> => {
  const { presignedUrl, publicUrl } = await requestSosoTalkPostImageUploadUrl(file);

  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error('소소톡 이미지 업로드에 실패했습니다.');
  }

  return publicUrl;
};

export const createSosoTalkPostLike = async (
  postId: number
): Promise<CreateSosoTalkPostLikeResponse> => {
  const response = await fetchClient.post(`/posts/${postId}/like`);

  if (!response.ok) {
    throw new Error('소소톡 게시글 좋아요에 실패했습니다.');
  }

  return PostLikeFromJSON(await response.json()) as CreateSosoTalkPostLikeResponse;
};

export const deleteSosoTalkPostLike = async (
  postId: number
): Promise<DeleteSosoTalkPostLikeResponse> => {
  const response = await fetchClient.delete(`/posts/${postId}/like`);

  if (!response.ok) {
    throw new Error('소소톡 게시글 좋아요 취소에 실패했습니다.');
  }

  return TeamIdMeetingsMeetingIdDelete200ResponseFromJSON(
    await response.json()
  ) as DeleteSosoTalkPostLikeResponse;
};

export const createSosoTalkComment = async ({
  postId,
  payload,
}: CreateSosoTalkCommentParams): Promise<CreateSosoTalkCommentResponse> => {
  const response = await fetchClient.post(`/posts/${postId}/comments`, payload);

  if (!response.ok) {
    throw new Error('소소톡 댓글 작성에 실패했습니다.');
  }

  return CommentFromJSON(await response.json()) as CreateSosoTalkCommentResponse;
};

export const updateSosoTalkComment = async ({
  postId,
  commentId,
  payload,
}: UpdateSosoTalkCommentParams): Promise<UpdateSosoTalkCommentResponse> => {
  const response = await fetchClient.patch(`/posts/${postId}/comments/${commentId}`, payload);

  if (!response.ok) {
    throw new Error('소소톡 댓글 수정에 실패했습니다.');
  }

  return CommentFromJSON(await response.json()) as UpdateSosoTalkCommentResponse;
};

export const deleteSosoTalkComment = async ({
  postId,
  commentId,
}: CommentMutationParams): Promise<DeleteSosoTalkCommentResponse> => {
  const response = await fetchClient.delete(`/posts/${postId}/comments/${commentId}`);

  if (!response.ok) {
    throw new Error('소소톡 댓글 삭제에 실패했습니다.');
  }

  return TeamIdMeetingsMeetingIdDelete200ResponseFromJSON(
    await response.json()
  ) as DeleteSosoTalkCommentResponse;
};

export const updateSosoTalkPost = async ({
  postId,
  payload,
}: UpdateSosoTalkPostParams): Promise<UpdateSosoTalkPostResponse> => {
  const response = await fetchClient.patch(`/posts/${postId}`, payload);

  if (!response.ok) {
    throw new Error('소소톡 게시글 수정에 실패했습니다.');
  }

  return PostWithAuthorFromJSON(await response.json()) as UpdateSosoTalkPostResponse;
};

export const deleteSosoTalkPost = async ({
  postId,
}: SosoTalkPostMutationParams): Promise<DeleteSosoTalkPostResponse> => {
  const response = await fetchClient.delete(`/posts/${postId}`);

  if (!response.ok) {
    throw new Error('소소톡 게시글 삭제에 실패했습니다.');
  }

  return TeamIdMeetingsMeetingIdDelete200ResponseFromJSON(
    await response.json()
  ) as DeleteSosoTalkPostResponse;
};
