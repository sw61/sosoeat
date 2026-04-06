/**
 * ISO 날짜 문자열을 'MM월 DD일' 형식으로 변환합니다.
 */
export function formatCommentDate(isoDate: string): string {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}월 ${day}일`;
}
