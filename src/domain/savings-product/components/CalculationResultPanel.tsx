import { useSavingsCalculatorContext } from 'domain/savings-product/contexts/SavingsCalculatorContext';
import { Assets, Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { formatNumber, removeFormatNumber } from 'utils/format';
import { calculateDifferenceAmount, calculateExpectedProfit, calculateMonthlyAmount } from '../utils/calculator';

export const CalculationResultPanel = () => {
  const {
    selectedProduct,
    selectedProductId,
    setSelectedProductId,
    monthlyAmount,
    savingsPeriod,
    targetAmount,
    recommendedProducts,
  } = useSavingsCalculatorContext();

  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const isSelected = (productId: string) => selectedProductId === productId;

  const handleSelect = (productId: string) => {
    if (isSelected(productId)) {
      setSelectedProductId('');
    } else {
      setSelectedProductId(productId);
    }
  };

  const monthlyAmountNumber = removeFormatNumber(monthlyAmount);
  const targetAmountNumber = removeFormatNumber(targetAmount);

  const expectedProfit = calculateExpectedProfit(monthlyAmountNumber, savingsPeriod, selectedProduct.annualRate);

  const differenceAmount = calculateDifferenceAmount(targetAmountNumber, expectedProfit);

  const recommendedMonthlyAmount = calculateMonthlyAmount(
    selectedProduct.annualRate,
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

      {recommendedProducts.map(product => (
        <ListRow
          key={product.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${formatNumber(product.minMonthlyAmount)}원 ~ ${formatNumber(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={isSelected(product.id) ? <Assets.Icon name="icon-check-circle-green" /> : null}
          onClick={() => handleSelect(product.id)}
        />
      ))}

      <Spacing size={40} />
    </>
  );
};
