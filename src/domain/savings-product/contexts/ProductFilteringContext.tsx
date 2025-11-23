import { createContext, ReactNode, useContext, useState } from 'react';

interface ContextValue {
  targetAmount: string;
  setTargetAmount: (amount: string) => void;

  monthlyAmount: string;
  setMonthlyAmount: (amount: string) => void;

  savingsPeriod: number;
  setSavingsPeriod: (terms: number) => void;

  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
}

const ProductFilteringContext = createContext<ContextValue | undefined>(undefined);

export function ProductFilteringProvider({ children }: { children: ReactNode }) {
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [monthlyAmount, setMonthlyAmount] = useState<string>('');
  const [savingsPeriod, setSavingsPeriod] = useState<number>(12);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  return (
    <ProductFilteringContext.Provider
      value={{
        targetAmount,
        setTargetAmount,
        monthlyAmount,
        setMonthlyAmount,
        savingsPeriod,
        setSavingsPeriod,
        selectedProductId,
        setSelectedProductId,
      }}
    >
      {children}
    </ProductFilteringContext.Provider>
  );
}

export function useProductFilteringContext() {
  const context = useContext(ProductFilteringContext);

  if (context === undefined) {
    throw new Error('useProductFilteringContext는 ProductFilteringProvider 내에서 사용되어야 합니다.');
  }

  return context;
}
