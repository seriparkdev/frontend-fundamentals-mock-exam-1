import { useState } from 'react';

export const useProductFilterForm = () => {
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [monthlyAmount, setMonthlyAmount] = useState<string>('');
  const [savingsPeriod, setSavingsPeriod] = useState<number>(12);

  return {
    targetAmount,
    setTargetAmount,
    monthlyAmount,
    setMonthlyAmount,
    savingsPeriod,
    setSavingsPeriod,
  };
};
