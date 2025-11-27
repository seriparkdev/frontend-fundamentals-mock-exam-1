import { ENDPOINT } from 'contants/endpoint';
import { http } from 'tosslib';

export interface SavingsProduct {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}

export const fetchSavingsProducts = async () => {
  return await http.get<SavingsProduct[]>(ENDPOINT.SAVINGS_PRODUCTS);
};
