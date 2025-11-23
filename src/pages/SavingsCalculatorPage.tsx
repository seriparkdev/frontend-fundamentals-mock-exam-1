import { CalculationResultPanel } from 'components/savings-product/CalculationResultPanel';
import { ProductFilterForm } from 'components/savings-product/ProductFilterForm';
import { SavingsProductPanel } from 'components/savings-product/SavingsProductPanel';
import { SavingsCalculatorProvider } from 'contexts/SavingsCalculatorContext';
import { useState } from 'react';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState<string>('products');

  return (
    <SavingsCalculatorProvider>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <ProductFilterForm />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={setSelectedTab}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>
      <Spacing size={8} />

      {selectedTab === 'products' && <SavingsProductPanel />}

      {selectedTab === 'results' && <CalculationResultPanel />}
    </SavingsCalculatorProvider>
  );
}
