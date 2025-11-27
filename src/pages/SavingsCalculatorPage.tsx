import { CalculationResultPanel } from 'domain/savings-product/components/CalculationResultPanel';
import { SavingsProductPanel } from 'domain/savings-product/components/SavingsProductPanel';
import { useState } from 'react';
import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { StatusHandlingBoundary } from 'components/StatusHandlingBoundary';
import { SavingsProductProvider } from 'domain/savings-product/contexts/SavingsProductContext';
import { useFilteringStates } from 'domain/savings-product/hooks/useFilteringStates';
import { FilteringStatesProvider } from 'domain/savings-product/contexts/FilteringStatesContext';

export function SavingsCalculatorPage() {
  const filteringStates = useFilteringStates();
  const [selectedTab, setSelectedTab] = useState<string>('products');

  return (
    <FilteringStatesProvider states={filteringStates}>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        value={filteringStates.targetAmount}
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        onChange={filteringStates.setTargetAmount}
      />

      <Spacing size={16} />

      <TextField
        value={filteringStates.monthlyAmount}
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        onChange={filteringStates.setMonthlyAmount}
      />

      <Spacing size={16} />

      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={filteringStates.savingsPeriod}
        onChange={filteringStates.setSavingsPeriod}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

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
    </FilteringStatesProvider>
  );
}
