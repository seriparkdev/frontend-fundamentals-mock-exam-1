import { Assets, colors, ListRow } from 'tosslib';
import { formatNumber } from 'utils/format';
import { useSavingsCalculatorContext } from 'contexts/SavingsCalculatorContext';

export const SavingsProductPanel = () => {
  const { filteredProducts } = useSavingsCalculatorContext();

  if (filteredProducts.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건과 일치하는 적금 상품이 없습니다." />} />;
  }

  return (
    <>
      {filteredProducts.map(product => (
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
          right={<Assets.Icon name="icon-check-circle-green" />}
          onClick={() => {}}
        />
      ))}
    </>
  );
};
