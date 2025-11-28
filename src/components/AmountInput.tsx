import { ComponentProps } from 'react';
import { TextField } from 'tosslib';

interface Props extends Omit<ComponentProps<typeof TextField>, 'value' | 'onChange'> {
  value: number | null;
  onChange: (e: number | null) => void;
}

export const AmountInput = ({ value, onChange, ...props }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',').join('');

    const numberValue = Number(value);

    if (isNaN(numberValue) || !isFinite(numberValue) || numberValue === 0) {
      onChange(null);
    } else {
      onChange(numberValue);
    }
  };

  return <TextField value={value?.toLocaleString() ?? ''} onChange={handleChange} {...props} />;
};
