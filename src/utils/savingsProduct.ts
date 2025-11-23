import { SavingsProduct } from 'types/savingsProduct';
import { removeFormatNumber } from './format';
import { round } from './math';

// 적금 상품 필터링 관련 함수
export const filteredSavingsProducts = (
  savingsProducts: SavingsProduct[],
  monthlyAmount: string,
  savingsPeriod: number
) => {
  const monthlyAmountNumber = removeFormatNumber(monthlyAmount);

  if (!monthlyAmount || !savingsPeriod) {
    return savingsProducts;
  }

  return savingsProducts.filter(product => {
    const isMounthlyAmountValid =
      product.minMonthlyAmount <= monthlyAmountNumber && product.maxMonthlyAmount >= monthlyAmountNumber;

    const isPeriodValid = product.availableTerms === savingsPeriod;

    return isMounthlyAmountValid && isPeriodValid;
  });
};

export const findSavingsProductById = (savingsProducts: SavingsProduct[], productId: string) =>
  savingsProducts.find(product => product.id === productId);

// 적금 상품 계산 관련 함수
export const calculateExpectedProfit = (monthlyAmount: number, savingsPeriod: number, annualRate: number) => {
  return monthlyAmount * savingsPeriod * (1 + annualRate * 0.5);
};

export const calculateDifferenceAmount = (targetAmount: number, expectedProfit: number) => {
  return targetAmount - expectedProfit;
};

export const calculateMonthlyAmount = (annualRate: number, savingsPeriod: number, targetAmount: number) => {
  return round(targetAmount / (savingsPeriod * (1 + annualRate * 0.5)), 1000);
};
