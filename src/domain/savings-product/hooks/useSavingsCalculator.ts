import { useMemo } from 'react';
import { useFetchSavingsProducts } from '../api/queries';
import { useProductFilterForm } from './useProductFilterForm';
import { useFilteredProducts } from './useFilteredProducts';
import { findSavingsProductById } from '../utils/filter';

export const useSavingsCalculator = () => {
  const { data: savingsProducts } = useFetchSavingsProducts();

  const { targetAmount, monthlyAmount, savingsPeriod, setTargetAmount, setMonthlyAmount, setSavingsPeriod } =
    useProductFilterForm();

  const { selectedSavingsProductId, setSelectedSavingsProductId, filteredProducts, recommendedProducts } =
    useFilteredProducts({
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
    recommendedProducts,

    selectedSavingsProduct,
    selectedSavingsProductId,
    setSelectedSavingsProductId,
  };
};
