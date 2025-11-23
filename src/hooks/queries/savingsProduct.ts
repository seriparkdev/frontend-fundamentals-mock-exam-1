import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSavingsProducts } from 'api/savingsProduct';
import { QUERY_KEY } from 'contants/queryKey';

export const useFetchSavingsProducts = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SAVINGS_PRODUCTS],
    queryFn: fetchSavingsProducts,
  });
};
