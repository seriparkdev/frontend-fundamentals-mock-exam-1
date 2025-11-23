import { useFetchSavingsProducts } from '../queries/savingsProduct';
import { useFilteredProducts } from './useFilteredProducts';
import { useProductFilterForm } from './useProductFilterForm';

export const useSavingsCalculator = () => {
  const { data: savingsProducts } = useFetchSavingsProducts();

  const { targetAmount, monthlyAmount, savingsPeriod, setTargetAmount, setMonthlyAmount, setSavingsPeriod } =
    useProductFilterForm();

  const { filteredProducts, selectedSavingsProductId, setSelectedSavingsProductId } = useFilteredProducts({
    savingsProducts,
    monthlyAmount,
    savingsPeriod,
  });

  return {
    targetAmount,
    setTargetAmount,
    monthlyAmount,
    setMonthlyAmount,
    savingsPeriod,
    setSavingsPeriod,

    filteredProducts,
    selectedSavingsProductId,
    setSelectedSavingsProductId,
  };
};
