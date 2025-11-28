import { parseAsString, useQueryState } from 'nuqs';

export function useSelectedId() {
  return useQueryState('selectedId', parseAsString);
}
