export const SOCIAL_CALLBACK_URL_KEY = 'social_login_callback_url';

/**
 * callbackUrl이 내부 경로인지 검증합니다.
 * /로 시작하고 //로 시작하지 않는 경우만 허용하여 Open Redirect를 방지합니다.
 */
export const isSafeCallbackUrl = (url: string): boolean => {
  return url.startsWith('/') && !url.startsWith('//');
};

/**
 * callbackUrl이 안전한 경우 해당 경로를, 아니면 fallback(기본값 '/')을 반환합니다.
 */
export const getSafeCallbackUrl = (url: string | null | undefined, fallback = '/'): string => {
  if (!url) return fallback;
  return isSafeCallbackUrl(url) ? url : fallback;
};
