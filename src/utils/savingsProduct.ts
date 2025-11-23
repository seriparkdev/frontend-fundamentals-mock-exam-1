import { SavingsProduct } from 'types/savingsProduct';
import { removeFormatNumber } from './format';

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
