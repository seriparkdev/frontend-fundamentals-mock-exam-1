import { Spacing } from 'tosslib';
import { AmountField } from 'components/AmountField';
import { useProductFilteringContext } from '../contexts/ProductFilteringContext';
import { Select } from 'components/Select';

const SAVINGS_PERIOD_OPTIONS = [
  { value: 6, label: '6개월' },
  { value: 12, label: '12개월' },
  { value: 24, label: '24개월' },
];

export const ProductFilterForm = () => {
  const { targetAmount, setTargetAmount, monthlyAmount, setMonthlyAmount, savingsPeriod, setSavingsPeriod } =
    useProductFilteringContext();

  return (
    <>
      <AmountField
        value={targetAmount}
        onChange={setTargetAmount}
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
      />
      <Spacing size={16} />
      <AmountField
        value={monthlyAmount}
        onChange={setMonthlyAmount}
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
      />
      <Spacing size={16} />
      <Select
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingsPeriod}
        onChange={setSavingsPeriod}
        options={SAVINGS_PERIOD_OPTIONS}
      />
    </>
  );
};
