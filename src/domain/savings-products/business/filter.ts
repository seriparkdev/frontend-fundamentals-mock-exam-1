import { removeFormatNumber } from 'utils/format';
import { SavingsProduct } from '../api';

export const filteredSavingsProducts = (
  savingsProducts: SavingsProduct[],
  monthlyAmount: string,
  savingsPeriod: number
) => {
  const monthlyAmountNumber = removeFormatNumber(monthlyAmount);

  return savingsProducts.filter(product => {
    const isPeriodValid = product.availableTerms === savingsPeriod;

    if (!monthlyAmountNumber) {
      return isPeriodValid;
    }

    const isMounthlyAmountValid =
      product.minMonthlyAmount <= monthlyAmountNumber && product.maxMonthlyAmount >= monthlyAmountNumber;

    return isMounthlyAmountValid && isPeriodValid;
  });
};

export const findSavingsProductById = (savingsProducts: SavingsProduct[], productId: string) =>
  savingsProducts.find(product => product.id === productId);
