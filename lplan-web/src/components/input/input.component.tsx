import React from "react";

import './input.component.css';

interface InputProps {
    label: string;
    name: string;
    type: string;
    value?: string;
    checked?: boolean;
    required?: boolean;
    readOnly?:boolean;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input = ({ label, name, type, value, checked, required, readOnly , error, onChange }: InputProps) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} checked={checked} required={required} readOnly={readOnly} onChange={onChange} />
      {error && <div className="error">{error}</div>}
    </div>
  );

  export default Input;
  