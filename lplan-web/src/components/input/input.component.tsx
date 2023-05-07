import React from "react";

interface InputProps {
    label: string;
    name: string;
    type: string;
    value?: string;
    checked?: boolean;
    required?: boolean;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input = ({ label, name, type, value, checked, required, error, onChange }: InputProps) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} checked={checked} required={required} onChange={onChange} />
      {error && <div className="error">{error}</div>}
    </div>
  );

  export default Input;
  