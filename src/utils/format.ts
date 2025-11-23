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

/**
 * 포맷팅된 숫자 문자열에서 천 단위 구분 쉼표를 제거하고 숫자로 변환합니다.
 *
 * @param value - 쉼표가 포함된 포맷팅된 숫자 문자열.
 * @returns 쉼표가 제거된 숫자 (예: 1000000)
 *
 * @example
 * ```typescript
 * removeFormatNumber("1,000,000"); // 1000000
 * removeFormatNumber("0"); // 0
 * ```
 */
export const removeFormatNumber = (value: string) => {
  return Number(value.replace(/,/g, ''));
};
