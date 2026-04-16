import {
  createDefaultSocialImage,
  socialImageAlt,
  socialImageSize,
} from '@/shared/lib/default-social-image';

export const alt = socialImageAlt;
export const size = socialImageSize;
export const contentType = 'image/png';

export default function TwitterImage() {
  return createDefaultSocialImage();
}
