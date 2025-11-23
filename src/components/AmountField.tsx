import { TextField } from 'tosslib';
import { formatNumber } from 'utils/format';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  suffix?: string;
}

export const AmountField = ({ value, onChange, label, placeholder, suffix }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericString = e.target.value.replace(/[^0-9]/g, '');

    if (numericString) {
      onChange(formatNumber(Number(numericString)));
    } else {
      onChange('');
    }
  };

  return <TextField value={value} label={label} placeholder={placeholder} suffix={suffix} onChange={handleChange} />;
};
