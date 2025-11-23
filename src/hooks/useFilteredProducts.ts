import { useMemo } from 'react';
import { SavingsProduct } from 'types/savingsProduct';
import { filteredSavingsProducts } from 'utils/savingsProduct';

interface Props {
  savingsProducts: SavingsProduct[];
  monthlyAmount: string;
  savingsPeriod: number;
}

export const useFilteredProducts = ({ savingsProducts, monthlyAmount, savingsPeriod }: Props) => {
  const filteredProducts = useMemo(
    () => filteredSavingsProducts(savingsProducts, monthlyAmount, savingsPeriod),
    [savingsProducts, monthlyAmount, savingsPeriod]
  );

  return {
    filteredProducts,
  };
};
