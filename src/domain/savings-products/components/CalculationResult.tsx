import { colors, ListRow } from 'tosslib';
import { useFilteringStates } from '../hooks/useFilteringStates';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSelectedId } from '../hooks/useSelectedId';
import { fetchSavingsProductsQueryOptions } from '../queries';
import {
  calculateDifferenceAmount,
  calculateExpectedProfit,
  calculateMonthlyAmount,
  filterByProductId,
} from '../business';

export const CalculationResult = () => {
  const [{ monthlyAmount, savingsPeriod, targetAmount }] = useFilteringStates();
  const [selectedId] = useSelectedId();

  const { data } = useSuspenseQuery(
    fetchSavingsProductsQueryOptions({
      filters: [x => filterByProductId(x, selectedId)],
    })
  );

  const selectedProduct = data[0];

  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  if (targetAmount === null) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="목표 금액을 입력해주세요." />} />;
  }

  const expectedProfit = calculateExpectedProfit(monthlyAmount, savingsPeriod, selectedProduct.annualRate);
  const differenceAmount = calculateDifferenceAmount(monthlyAmount, expectedProfit);
  const recommendedMonthlyAmount = calculateMonthlyAmount(selectedProduct.annualRate, savingsPeriod, targetAmount);

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${expectedProfit.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${differenceAmount.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendedMonthlyAmount.toLocaleString()}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
};
