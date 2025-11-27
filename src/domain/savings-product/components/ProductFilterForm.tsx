import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { useFilteringStatesContext } from '../contexts/FilteringStatesContext';

export const ProductFilterForm = () => {
  const { targetAmount, setTargetAmount, monthlyAmount, setMonthlyAmount, savingsPeriod, setSavingsPeriod } =
    useFilteringStatesContext();

  return (
    <>
      <TextField
        value={targetAmount}
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        onChange={setTargetAmount}
      />

      <Spacing size={16} />

      <TextField
        value={monthlyAmount}
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        onChange={setMonthlyAmount}
      />

      <Spacing size={16} />

      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingsPeriod}
        onChange={setSavingsPeriod}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
};
