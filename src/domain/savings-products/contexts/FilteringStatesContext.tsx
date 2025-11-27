import { ChangeEventHandler, createContext, ReactNode, useContext } from 'react';

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

const FilteringStatesContext = createContext<ContextValue | undefined>(undefined);

export function FilteringStatesProvider({ states, children }: { states: ContextValue; children: ReactNode }) {
  return (
    <FilteringStatesContext.Provider
      value={{
        ...states,
      }}
    >
      {children}
    </FilteringStatesContext.Provider>
  );
}

export function useFilteringStatesContext() {
  const context = useContext(FilteringStatesContext);

  if (context === undefined) {
    throw new Error('useFilteringStatesContext는 FilteringStatesProvider 내에서 사용되어야 합니다.');
  }

  return context;
}
