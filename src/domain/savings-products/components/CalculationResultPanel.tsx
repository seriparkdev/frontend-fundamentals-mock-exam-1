import { Assets, Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { calculateDifferenceAmount, calculateExpectedProfit, calculateMonthlyAmount } from '../business/calculation';
import { useSavingsProductContext } from '../contexts/SavingsProductContext';
import { useFilteringStatesContext } from '../contexts/FilteringStatesContext';

export const CalculationResultPanel = () => {
  const { monthlyAmount, savingsPeriod, targetAmount, selectedProductId, setSelectedProductId } =
    useFilteringStatesContext();
  const { selectedProduct, recommendedProducts } = useSavingsProductContext();

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
            top="목표 금액과의 차액"
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
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${recommendedMonthlyAmount.toLocaleString()}원`}
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
              bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
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
