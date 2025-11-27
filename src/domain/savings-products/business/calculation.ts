import { round } from 'utils/math';

export const calculateExpectedProfit = (monthlyAmount: number | null, savingsPeriod: number, annualRate: number) => {
  if (monthlyAmount === null) {
    return 0;
  }

  return monthlyAmount * savingsPeriod * (1 + annualRate * 0.5);
};

export const calculateDifferenceAmount = (targetAmount: number | null, expectedProfit: number) => {
  if (targetAmount === null) {
    return 0;
  }

  return targetAmount - expectedProfit;
};

export const calculateMonthlyAmount = (annualRate: number, savingsPeriod: number, targetAmount: number | null) => {
  if (targetAmount === null) {
    return 0;
  }

  return round(targetAmount / (savingsPeriod * (1 + annualRate * 0.5)), 1000);
};
