/**
 * 주어진 값을 지정된 단위로 반올림합니다.
 *
 * @param value - 반올림할 숫자 값
 * @param unit - 반올림 단위 (예: 10, 100, 1000)
 * @returns 단위로 반올림된 값
 *
 * @example
 * ```ts
 * round(1234, 100); // 1200
 * round(1567, 100); // 1600
 * round(1250, 1000); // 1000
 * round(1550, 1000); // 2000
 * ```
 */
export const round = (value: number, unit: number) => {
  return Math.round(value / unit) * unit;
};
