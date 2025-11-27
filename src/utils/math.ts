export const round = (value: number, unit: number) => {
  return Math.round(value / unit) * unit;
};
