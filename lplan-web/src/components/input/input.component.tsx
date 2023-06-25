import React from "react";

import "./input.component.css";

interface InputProps {
	label: string;
	name: string;
	type: string;
	value?: string;
	required?: boolean;
	readOnly?: boolean;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
	label,
	name,
	type,
	value,
	required,
	readOnly,
	error,
	onChange,
}: InputProps) => (
	<div>
		<label htmlFor={name}>{label}</label>
		<input
			id={name}
			name={name}
			type={type}
			value={value}
			required={required}
			readOnly={readOnly}
			onChange={onChange}
		/>
		{error && <div className="error">{error}</div>}
	</div>
);

export default Input;
