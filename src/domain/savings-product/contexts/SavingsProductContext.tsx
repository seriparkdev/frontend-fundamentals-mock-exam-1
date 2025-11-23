import { createContext, ReactNode, useContext, useMemo } from 'react';
import { SavingsProduct } from '../api/http';
import { filteredSavingsProducts, findSavingsProductById } from '../utils/filter';
import { useProductFilteringContext } from './ProductFilteringContext';
import { useFetchSavingsProducts } from '../api/queries';

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

  const { monthlyAmount, savingsPeriod, selectedProductId } = useProductFilteringContext();

  const filteredProducts = useMemo(
    () => filteredSavingsProducts(savingsProducts, monthlyAmount, savingsPeriod),
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
