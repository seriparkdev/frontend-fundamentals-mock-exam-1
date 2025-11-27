import { createContext, ReactNode, useContext, useMemo } from 'react';
import { SavingsProduct } from 'domain/savings-products/api';
import { useFilteringStatesContext } from './FilteringStatesContext';
import { useFetchSavingsProducts } from 'domain/savings-products/queries';
import { filterByMonthlyAmount, filterBySavingsPeriod, findSavingsProductById } from '../business/filter';

interface ContextValue {
  filteredProducts: SavingsProduct[];
  recommendedProducts: SavingsProduct[];
  selectedProduct: SavingsProduct | undefined;
}

const SavingsProductContext = createContext<ContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function SavingsProductProvider({ children }: Props) {
  const { data: savingsProducts } = useFetchSavingsProducts();

  const { monthlyAmount, savingsPeriod, selectedProductId } = useFilteringStatesContext();

  const filteredProducts = useMemo(
    () =>
      savingsProducts.filter(
        product => filterBySavingsPeriod(product, savingsPeriod) && filterByMonthlyAmount(product, monthlyAmount)
      ),
    [savingsProducts, monthlyAmount, savingsPeriod]
  );

  const selectedProduct = useMemo(
    () => findSavingsProductById(filteredProducts, selectedProductId),
    [filteredProducts, selectedProductId]
  );

  const recommendedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
  }, [filteredProducts]);

  return (
    <SavingsProductContext.Provider
      value={{
        filteredProducts,
        recommendedProducts,
        selectedProduct,
      }}
    >
      {children}
    </SavingsProductContext.Provider>
  );
}

export function useSavingsProductContext() {
  const context = useContext(SavingsProductContext);

  if (context === undefined) {
    throw new Error('useSavingsProductContext는 SavingsProductProvider 내에서 사용되어야 합니다.');
  }

  return context;
}
