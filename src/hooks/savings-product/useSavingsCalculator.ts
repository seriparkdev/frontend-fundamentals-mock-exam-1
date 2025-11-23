import { findSavingsProductById } from 'utils/savingsProduct';
import { useFetchSavingsProducts } from '../queries/savingsProduct';
import { useFilteredProducts } from './useFilteredProducts';
import { useProductFilterForm } from './useProductFilterForm';
import { useMemo } from 'react';

export const useSavingsCalculator = () => {
  const { data: savingsProducts } = useFetchSavingsProducts();

  const { targetAmount, monthlyAmount, savingsPeriod, setTargetAmount, setMonthlyAmount, setSavingsPeriod } =
    useProductFilterForm();

  const { filteredProducts, selectedSavingsProductId, setSelectedSavingsProductId } = useFilteredProducts({
    savingsProducts,
    monthlyAmount,
    savingsPeriod,
  });

  const selectedSavingsProduct = useMemo(() => {
    return findSavingsProductById(filteredProducts, selectedSavingsProductId);
  }, [filteredProducts, selectedSavingsProductId]);

  return {
    targetAmount,
    setTargetAmount,
    monthlyAmount,
    setMonthlyAmount,
    savingsPeriod,
    setSavingsPeriod,

    filteredProducts,
    selectedSavingsProduct,
    selectedSavingsProductId,
    setSelectedSavingsProductId,
  };
};
