/**
 * 숫자를 한국식 천 단위 구분 형식으로 변환합니다.
 *
 * @param value - 포맷팅할 숫자.
 * @returns 천 단위 쉼표가 포함된 문자열 (예: "1,000,000")
 *
 * @example
 * ```typescript
 * formatNumber(1000000); // "1,000,000"
 * formatNumber(0); // "0"
 * ```
 */
export const formatNumber = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const removeFormatNumber = (value: string) => {
  return Number(value.replace(/,/g, ''));
};
