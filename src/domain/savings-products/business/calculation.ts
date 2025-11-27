import { round } from 'utils/math';

export const calculateExpectedProfit = (monthlyAmount: number, savingsPeriod: number, annualRate: number) => {
  return monthlyAmount * savingsPeriod * (1 + annualRate * 0.5);
};

export const calculateDifferenceAmount = (targetAmount: number, expectedProfit: number) => {
  return targetAmount - expectedProfit;
};

export const calculateMonthlyAmount = (annualRate: number, savingsPeriod: number, targetAmount: number) => {
  return round(targetAmount / (savingsPeriod * (1 + annualRate * 0.5)), 1000);
};
