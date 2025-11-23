import { useMemo, useState } from 'react';
import { filteredSavingsProducts, findSavingsProductById } from '../utils/filter';
import { SavingsProduct } from '../api/http';

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

  const recommendedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
  }, [filteredProducts]);

  return {
    selectedSavingsProductId,
    setSelectedSavingsProductId,

    filteredProducts,
    selectedProduct,
    recommendedProducts,
  };
};
