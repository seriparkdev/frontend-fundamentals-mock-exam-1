import { createContext, ReactNode, useContext, useMemo } from 'react';
import { SavingsProduct } from '../api/http';
import { useFetchSavingsProducts } from '../api/queries';
import { useProductFilterForm } from '../hooks/useProductFilterForm';
import { useFilteredProducts } from '../hooks/useFilteredProducts';
import { findSavingsProductById } from '../utils/filter';

interface ContextValue {
  targetAmount: string;
  setTargetAmount: (amount: string) => void;

  monthlyAmount: string;
  setMonthlyAmount: (amount: string) => void;

  savingsPeriod: number;
  setSavingsPeriod: (terms: number) => void;

  selectedSavingsProduct: SavingsProduct | undefined;
  selectedSavingsProductId: string;
  setSelectedSavingsProductId: (id: string) => void;

  filteredProducts: SavingsProduct[];
  recommendedProducts: SavingsProduct[];
}

const SavingsCalculatorContext = createContext<ContextValue | undefined>(undefined);

export function SavingsCalculatorProvider({ children }: { children: ReactNode }) {
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

  return (
    <SavingsCalculatorContext.Provider
      value={{
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
      }}
    >
      {children}
    </SavingsCalculatorContext.Provider>
  );
}

export function useSavingsCalculatorContext() {
  const context = useContext(SavingsCalculatorContext);

  if (context === undefined) {
    throw new Error('useSavingsCalculatorContext은 SavingsCalculatorProvider 내에서 사용되어야 합니다.');
  }

  return context;
}
