export const kakaoRedirectUri =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_PROD
    : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_DEV;
