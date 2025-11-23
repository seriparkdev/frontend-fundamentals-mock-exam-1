import { ChangeEventHandler, useCallback, useState } from 'react';

export const useInput = (initialValue: string, transformValue: (value: string) => string) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange: ChangeEventHandler<HTMLElement & { value: string }> = useCallback(
    ({ target: { value } }) => {
      setValue(transformValue(value));
    },
    [transformValue]
  );

  return [value, handleValueChange] as const;
};
