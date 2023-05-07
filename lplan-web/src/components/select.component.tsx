interface SelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: {
      value: string;
      label: string;
    }[];
    defaultValue?: string;
    required?: boolean;
    disabled?: boolean;
  }
  
  const Select = ({ label, name, value, onChange, options, defaultValue, required, disabled }: SelectProps) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange} defaultValue={defaultValue} required={required} disabled={disabled}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
  
  export default Select;
  