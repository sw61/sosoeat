/**
 * JWT 토큰 검증 유틸리티
 */

/**
 * Base64URL을 표준 Base64로 변환합니다.
 * JWT는 Base64URL 형식을 사용하므로 atob 사용 전 변환이 필요합니다.
 */
const decodeBase64Url = (str: string): string => {
  // Base64URL 문자를 표준 Base64로 치환: - → +, _ → /
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  // 필요시 패딩 추가 (4의 배수 맞추기)
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return atob(padded);
};

/**
 * JWT 토큰의 만료 여부를 확인합니다.
 * 서버 시간 차이를 보정하기 위해 1분의 여유를 두고 판단합니다.
 * @param token JWT 토큰 문자열
 * @returns 만료됐으면 true, 유효하면 false
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(decodeBase64Url(token.split('.')[1]));
    const MARGIN = 60 * 1000; // 1분 여유
    return payload.exp * 1000 - MARGIN < Date.now();
  } catch {
    return true;
  }
};
