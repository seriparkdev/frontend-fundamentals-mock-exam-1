import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'contants/queryKey';
import { fetchSavingsProducts } from './api';

export const useFetchSavingsProducts = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.SAVINGS_PRODUCTS],
    queryFn: fetchSavingsProducts,
  });
};
