import { formatNumber } from './format';

/**
 * 입력된 문자열에서 숫자만 추출하여 천 단위 콤마로 포맷팅합니다.
 *
 * @param value - 변환할 문자열 (예: "1234")
 * @returns 숫자만 추출하여 포맷팅된 문자열. 숫자가 없으면 빈 문자열 반환
 *
 * @example
 * transformFormattedNumber("1,234원"); // "1,234"
 * transformFormattedNumber("1234567"); // "1,234,567"
 */
export const transformFormattedNumber = (value: string) => {
  const numericString = value.replace(/[^0-9]/g, '');

  if (numericString) {
    return formatNumber(Number(numericString));
  } else {
    return '';
  }
};
