import { CalculationResult } from 'domain/savings-products/components/CalculationResult';
import { Border, ListHeader, NavigationBar, SelectBottomSheet, Spacing, Tab } from 'tosslib';
import { useFilteringStates } from 'domain/savings-products/hooks/useFilteringStates';
import { useView } from 'hooks/useView';
import { AmountInput } from 'components/AmountInput';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { ProductList } from 'domain/savings-products/components/ProductList';
import { filterByMonthlyAmount, filterBySavingsPeriod, orderByAnnualRate } from 'domain/savings-products/business';

export function SavingsCalculatorPage() {
  const [filteringStates, setFilteringStates] = useFilteringStates();
  const [view, setView] = useView('products');

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <AmountInput
        value={filteringStates.targetAmount}
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        onChange={value => setFilteringStates({ ...filteringStates, targetAmount: value })}
      />

      <Spacing size={16} />

      <AmountInput
        value={filteringStates.monthlyAmount}
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        onChange={value => setFilteringStates({ ...filteringStates, monthlyAmount: value })}
      />

      <Spacing size={16} />

      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={filteringStates.savingsPeriod}
        onChange={value => setFilteringStates({ ...filteringStates, savingsPeriod: value })}
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

      {view === 'products' && (
        <ErrorBoundary fallback={<ProductList.Error />}>
          <Suspense fallback={<ProductList.Loading />}>
            <ProductList
              filters={[
                x => filterBySavingsPeriod(x, filteringStates.savingsPeriod),
                x => filterByMonthlyAmount(x, filteringStates.monthlyAmount),
              ]}
            />
          </Suspense>
        </ErrorBoundary>
      )}
      {view === 'results' && (
        <>
          <Spacing size={8} />

          <CalculationResult />

          <Spacing size={8} />
          <Border height={16} />
          <Spacing size={8} />

          <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />

          <Spacing size={12} />

          <ErrorBoundary fallback={<ProductList.Error />}>
            <Suspense fallback={<ProductList.Loading />}>
              <ProductList
                filters={[
                  x => filterBySavingsPeriod(x, filteringStates.savingsPeriod),
                  x => filterByMonthlyAmount(x, filteringStates.monthlyAmount),
                ]}
                orderBy={orderByAnnualRate}
                limit={2}
              />
            </Suspense>
          </ErrorBoundary>

          <Spacing size={40} />
        </>
      )}
    </>
  );
}
