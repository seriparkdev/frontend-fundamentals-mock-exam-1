import { useInput } from 'hooks/useInput';
import { ChangeEventHandler, createContext, ReactNode, useContext, useState } from 'react';
import { transformFormattedNumber } from 'utils/transform';

interface ContextValue {
  targetAmount: string;
  setTargetAmount: ChangeEventHandler;

  monthlyAmount: string;
  setMonthlyAmount: ChangeEventHandler;

  savingsPeriod: number;
  setSavingsPeriod: (terms: number) => void;

  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
}

const ProductFilteringContext = createContext<ContextValue | undefined>(undefined);

export function ProductFilteringProvider({ children }: { children: ReactNode }) {
  const [targetAmount, setTargetAmount] = useInput('', transformFormattedNumber);
  const [monthlyAmount, setMonthlyAmount] = useInput('', transformFormattedNumber);
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
