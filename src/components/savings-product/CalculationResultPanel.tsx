import { useSavingsCalculatorContext } from 'contexts/SavingsCalculatorContext';
import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { formatNumber, removeFormatNumber } from 'utils/format';
import { calculateExpectedProfit, calculateMonthlyAmount, calculateDifferenceAmount } from 'utils/savingsProduct';

export const CalculationResultPanel = () => {
  const { selectedSavingsProduct, monthlyAmount, savingsPeriod, targetAmount } = useSavingsCalculatorContext();

  if (!selectedSavingsProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const monthlyAmountNumber = removeFormatNumber(monthlyAmount);
  const targetAmountNumber = removeFormatNumber(targetAmount);

  const expectedProfit = calculateExpectedProfit(monthlyAmountNumber, savingsPeriod, selectedSavingsProduct.annualRate);

  const differenceAmount = calculateDifferenceAmount(targetAmountNumber, expectedProfit);

  const recommendedMonthlyAmount = calculateMonthlyAmount(
    selectedSavingsProduct.annualRate,
    savingsPeriod,
    targetAmountNumber
  );

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(expectedProfit)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(differenceAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatNumber(recommendedMonthlyAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'기본 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: 3.2%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`100,000원 ~ 500,000원 | 12개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />

      <Spacing size={40} />
    </>
  );
};
