import { CalculationResultPanel } from 'domain/savings-product/components/CalculationResultPanel';
import { ProductFilterForm } from 'domain/savings-product/components/ProductFilterForm';
import { SavingsProductPanel } from 'domain/savings-product/components/SavingsProductPanel';
import { useState } from 'react';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';
import { StatusHandlingBoundary } from 'components/StatusHandlingBoundary';
import { SavingsProductProvider } from 'domain/savings-product/contexts/SavingsProductContext';
import { ProductFilteringProvider } from 'domain/savings-product/contexts/ProductFilteringContext';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState<string>('products');

  return (
    <ProductFilteringProvider>
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

      <StatusHandlingBoundary>
        <SavingsProductProvider>
          {selectedTab === 'products' && <SavingsProductPanel />}
          {selectedTab === 'results' && <CalculationResultPanel />}
        </SavingsProductProvider>
      </StatusHandlingBoundary>
    </ProductFilteringProvider>
  );
}
