/**
 * JWT 토큰 검증 유틸리티
 */

/**
 * JWT 토큰의 만료 여부를 확인합니다.
 * 서버 시간 차이를 보정하기 위해 1분의 여유를 두고 판단합니다.
 * @param token JWT 토큰 문자열
 * @returns 만료됐으면 true, 유효하면 false
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const MARGIN = 60 * 1000; // 1분 여유
    return payload.exp * 1000 - MARGIN < Date.now();
  } catch {
    return true;
  }
};
