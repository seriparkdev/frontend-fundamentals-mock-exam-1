import { transformFormattedNumber } from 'utils/transform';
import { useInput } from '../../../hooks/useInput';
import { useState } from 'react';

export function useFilteringStates() {
  const [targetAmount, setTargetAmount] = useInput('', transformFormattedNumber);
  const [monthlyAmount, setMonthlyAmount] = useInput('', transformFormattedNumber);
  const [savingsPeriod, setSavingsPeriod] = useState<number>(12);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  return {
    targetAmount,
    setTargetAmount,
    monthlyAmount,
    setMonthlyAmount,
    savingsPeriod,
    setSavingsPeriod,
    selectedProductId,
    setSelectedProductId,
  };
}
