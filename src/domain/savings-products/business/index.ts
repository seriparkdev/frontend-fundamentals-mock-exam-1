import { SavingsProduct } from '../api';
import { round } from 'utils/math';

export type FilterSavingsProduct = (product: SavingsProduct) => boolean;

export const filterBySavingsPeriod = (product: SavingsProduct, savingsPeriod: number | null) => {
  if (savingsPeriod === null) {
    return true;
  }

  return product.availableTerms === savingsPeriod;
};

export const filterByMonthlyAmount = (product: SavingsProduct, monthlyAmount: number | null) => {
  if (monthlyAmount === null) {
    return true;
  }

  return product.minMonthlyAmount <= monthlyAmount && product.maxMonthlyAmount >= monthlyAmount;
};

export const filterByProductId = (product: SavingsProduct, productId: string | null) => {
  if (productId === null) {
    return false;
  }

  return product.id === productId;
};

export type OrderBy = (a: SavingsProduct, b: SavingsProduct) => number;

export const orderByAnnualRate = (a: SavingsProduct, b: SavingsProduct) => b.annualRate - a.annualRate;

export const calculateExpectedProfit = (
  monthlyAmount: number | null,
  savingsPeriod: number | null,
  annualRate: number
) => {
  if (monthlyAmount === null || savingsPeriod === null) {
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

export const calculateMonthlyAmount = (
  annualRate: number,
  savingsPeriod: number | null,
  targetAmount: number | null
) => {
  if (targetAmount === null || savingsPeriod === null) {
    return 0;
  }

  return round(targetAmount / (savingsPeriod * (1 + annualRate * 0.5)), 1000);
};
