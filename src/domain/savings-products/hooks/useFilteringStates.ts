import { useState } from 'react';

export function useFilteringStates() {
  const [targetAmount, setTargetAmount] = useState<number | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState<number | null>(null);
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
