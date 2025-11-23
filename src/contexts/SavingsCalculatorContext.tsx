import { createContext, ReactNode, useContext } from 'react';
import { SavingsProduct } from 'types/savingsProduct';

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
}

const SavingsCalculatorContext = createContext<ContextValue | undefined>(undefined);

export function SavingsCalculatorProvider({ value, children }: { value: ContextValue; children: ReactNode }) {
  return <SavingsCalculatorContext.Provider value={value}>{children}</SavingsCalculatorContext.Provider>;
}

export function useSavingsCalculatorContext() {
  const context = useContext(SavingsCalculatorContext);

  if (context === undefined) {
    throw new Error('useSavingsCalculatorContext은 SavingsCalculatorProvider 내에서 사용되어야 합니다.');
  }

  return context;
}
