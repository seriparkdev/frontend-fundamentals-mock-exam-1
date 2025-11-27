import { QUERY_KEY } from 'contants/queryKey';
import { fetchSavingsProducts, SavingsProduct } from './api';
import { useSuspenseQuery } from '@tanstack/react-query';

interface Props {
  filters?: Array<(product: SavingsProduct) => boolean>;
  orderBy?: (a: SavingsProduct, b: SavingsProduct) => number;
  limit?: number;
}

export const fetchSavingsProductsQueryOptions = ({ filters, orderBy, limit }: Props) => {
  return {
    queryKey: [QUERY_KEY.SAVINGS_PRODUCTS],
    queryFn: fetchSavingsProducts,
    select: (savingsProducts: Awaited<ReturnType<typeof fetchSavingsProducts>>) => {
      const filteredProducts = savingsProducts.filter(product => filters?.every(filter => filter(product)));

      if (orderBy !== null) {
        return filteredProducts.sort(orderBy).slice(0, limit);
      }
    },
  };
};

export const useFetchSavingsProducts = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SAVINGS_PRODUCTS],
    queryFn: fetchSavingsProducts,
  });
};
