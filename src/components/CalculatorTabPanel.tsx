import { useFetchSavingsProducts } from 'hooks/queries/savingsProduct';
import { SavingsProductPanel } from './savingsProductPanel';

export const CalculatorTabPanel = () => {
  const { data: savingsProducts } = useFetchSavingsProducts();
  return <SavingsProductPanel products={savingsProducts} />;
};
