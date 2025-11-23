import { ENDPOINT } from 'contants/endpoint';
import { http } from 'tosslib';
import { SavingsProduct } from 'types/savingsProduct';

export const fetchSavingsProducts = async () => {
  const response = await http.get<SavingsProduct[]>(ENDPOINT.SAVINGS_PRODUCTS);
  return response;
};
