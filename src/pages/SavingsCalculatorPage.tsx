import { CalculationResultPanel } from 'domain/savings-products/components/CalculationResultPanel';
import { SavingsProductPanel } from 'domain/savings-products/components/SavingsProductPanel';
import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab } from 'tosslib';
import { StatusHandlingBoundary } from 'components/StatusHandlingBoundary';
import { SavingsProductProvider } from 'domain/savings-products/contexts/SavingsProductContext';
import { useFilteringStates } from 'domain/savings-products/hooks/useFilteringStates';
import { FilteringStatesProvider } from 'domain/savings-products/contexts/FilteringStatesContext';
import { useView } from 'hooks/useView';
import { AmountInput } from 'components/AmountInput';

export function SavingsCalculatorPage() {
  const filteringStates = useFilteringStates();
  const [view, setView] = useView('products');

  return (
    <FilteringStatesProvider states={filteringStates}>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <AmountInput
        value={filteringStates.targetAmount}
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        onChange={filteringStates.setTargetAmount}
      />

      <Spacing size={16} />

      <AmountInput
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

      <Tab onChange={setView}>
        <Tab.Item value="products" selected={view === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={view === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      <Spacing size={8} />

      <StatusHandlingBoundary>
        <SavingsProductProvider>
          {view === 'products' && <SavingsProductPanel />}
          {view === 'results' && <CalculationResultPanel />}
        </SavingsProductProvider>
      </StatusHandlingBoundary>
    </FilteringStatesProvider>
  );
}
