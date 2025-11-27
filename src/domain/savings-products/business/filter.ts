import { SavingsProduct } from '../api';

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

export const findSavingsProductById = (savingsProducts: SavingsProduct[], productId: string) =>
  savingsProducts.find(product => product.id === productId);
