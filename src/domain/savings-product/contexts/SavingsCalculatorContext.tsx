import { createContext, ReactNode, useContext } from 'react';
import { SavingsProduct } from '../api/http';
import { useFetchSavingsProducts } from '../api/queries';
import { useProductFilterForm } from '../hooks/useProductFilterForm';
import { useFilteredProducts } from '../hooks/useFilteredProducts';

interface ContextValue {
  targetAmount: string;
  setTargetAmount: (amount: string) => void;

  monthlyAmount: string;
  setMonthlyAmount: (amount: string) => void;

  savingsPeriod: number;
  setSavingsPeriod: (terms: number) => void;

  selectedProduct: SavingsProduct | undefined;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;

  filteredProducts: SavingsProduct[];
  recommendedProducts: SavingsProduct[];
}

const SavingsCalculatorContext = createContext<ContextValue | undefined>(undefined);

export function SavingsCalculatorProvider({ children }: { children: ReactNode }) {
  const { data: savingsProducts } = useFetchSavingsProducts();

  const { targetAmount, monthlyAmount, savingsPeriod, setTargetAmount, setMonthlyAmount, setSavingsPeriod } =
    useProductFilterForm();

  const {
    selectedProductId,
    setSelectedProductId,

    filteredProducts,
    selectedProduct,
    recommendedProducts,
  } = useFilteredProducts({
    savingsProducts,
    monthlyAmount,
    savingsPeriod,
  });

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

        selectedProduct,
        selectedProductId,
        setSelectedProductId,
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
