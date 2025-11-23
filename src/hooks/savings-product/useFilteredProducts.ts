import { useMemo, useState } from 'react';
import { SavingsProduct } from 'types/savingsProduct';
import { filteredSavingsProducts, findSavingsProductById } from 'utils/savingsProduct';

interface Props {
  savingsProducts: SavingsProduct[];
  monthlyAmount: string;
  savingsPeriod: number;
}

export const useFilteredProducts = ({ savingsProducts, monthlyAmount, savingsPeriod }: Props) => {
  const [selectedSavingsProductId, setSelectedSavingsProductId] = useState<string>('');

  const filteredProducts = useMemo(
    () => filteredSavingsProducts(savingsProducts, monthlyAmount, savingsPeriod),
    [savingsProducts, monthlyAmount, savingsPeriod]
  );

  const selectedProduct = useMemo(
    () => findSavingsProductById(filteredProducts, selectedSavingsProductId),
    [filteredProducts, selectedSavingsProductId]
  );

  return {
    filteredProducts,
    selectedProduct,

    selectedSavingsProductId,
    setSelectedSavingsProductId,
  };
};
