import { SelectBottomSheet } from 'tosslib';

interface Props {
  label: string;
  title: string;
  value: number;
  onChange: (value: number) => void;
  options: Array<{ value: number; label: string }>;
}

export const Select = ({ label, title, value, onChange, options }: Props) => {
  return (
    <SelectBottomSheet label={label} title={title} value={value} onChange={onChange}>
      {options.map(option => (
        <SelectBottomSheet.Option key={option.value} value={option.value}>
          {option.label}
        </SelectBottomSheet.Option>
      ))}
    </SelectBottomSheet>
  );
};
