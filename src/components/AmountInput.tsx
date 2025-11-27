import { ComponentProps } from 'react';
import { TextField } from 'tosslib';

interface Props extends Omit<ComponentProps<typeof TextField>, 'value' | 'onChange'> {
  value: number | null;
  onChange: (e: number) => void;
}

export const AmountInput = ({ value, onChange, ...props }: Props) => {
  return (
    <TextField
      value={value?.toLocaleString() ?? ''}
      onChange={e => onChange(Number(e.target.value.split(',').join('')))}
      {...props}
    />
  );
};
