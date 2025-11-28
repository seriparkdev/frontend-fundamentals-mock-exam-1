import { parseAsInteger, useQueryStates } from 'nuqs';

export function useFilteringStates() {
  return useQueryStates({
    targetAmount: parseAsInteger,
    monthlyAmount: parseAsInteger,
    savingsPeriod: parseAsInteger.withDefault(12),
  });
}
