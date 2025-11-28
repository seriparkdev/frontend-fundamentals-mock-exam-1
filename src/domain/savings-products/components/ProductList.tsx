import { useSuspenseQuery } from '@tanstack/react-query';
import { FilterSavingsProduct } from '../business';
import { fetchSavingsProductsQueryOptions } from '../queries';
import { Assets, colors, ListRow } from 'tosslib';
import { useSelectedId } from '../hooks/useSelectedId';

interface Props {
  filters: FilterSavingsProduct[];
  orderBy?: any;
  limit?: number;
}

export const ProductList = ({ filters, orderBy, limit }: Props) => {
  const { data: products } = useSuspenseQuery(
    fetchSavingsProductsQueryOptions({
      filters,
      orderBy,
      limit,
    })
  );

  const [selectedId, setSelectedId] = useSelectedId();

  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건과 일치하는 적금 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => (
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
          right={selectedId === product.id ? <Assets.Icon name="icon-check-circle-green" /> : null}
          onClick={() => setSelectedId(product.id)}
        />
      ))}
    </>
  );
};

ProductList.Loading = () => {
  return (
    <>
      <ListRow contents={<ListRow.Texts type="1RowTypeA" top="적금 상품 목록을 불러오는 중..." />} />
    </>
  );
};

ProductList.Error = () => {
  return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="적금 상품 목록을 불러올 수 없어요." />} />;
};
