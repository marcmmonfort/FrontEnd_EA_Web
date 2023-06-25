import React, { useState } from "react";

import "./select.component.css";

interface SelectProps {
	label: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: {
		value: string;
		label: string;
	}[];
	value?: string;
	required?: boolean;
	disabled?: boolean;
}

const Select = ({
	label,
	name,
	onChange,
	options,
	value,
	required,
	disabled,
}: SelectProps) => {
	const [selectedValue, setSelectedValue] = useState(value || "");

	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(event.target.value);
		onChange(event);
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<select
				id={name}
				name={name}
				value={selectedValue}
				onChange={handleOnChange}
				required={required}
				disabled={disabled}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
