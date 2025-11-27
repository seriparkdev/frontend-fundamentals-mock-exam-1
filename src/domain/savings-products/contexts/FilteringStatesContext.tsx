import { createContext, ReactNode, useContext } from 'react';
import { useFilteringStates } from '../hooks/useFilteringStates';

interface ContextValue {
  targetAmount: ReturnType<typeof useFilteringStates>['targetAmount'];
  setTargetAmount: ReturnType<typeof useFilteringStates>['setTargetAmount'];

  monthlyAmount: ReturnType<typeof useFilteringStates>['monthlyAmount'];
  setMonthlyAmount: ReturnType<typeof useFilteringStates>['setMonthlyAmount'];

  savingsPeriod: ReturnType<typeof useFilteringStates>['savingsPeriod'];
  setSavingsPeriod: ReturnType<typeof useFilteringStates>['setSavingsPeriod'];

  selectedProductId: ReturnType<typeof useFilteringStates>['selectedProductId'];
  setSelectedProductId: ReturnType<typeof useFilteringStates>['setSelectedProductId'];
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
