interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelText: string;
}

export function RadioButton({ labelText, id, ...props }: RadioButtonProps) {
	return (
		<div className="flex gap-2 items-center">
			<input
				title={labelText}
				{...props}
				// Immutable attributes
				type="radio"
				id={id}
			/>
			<label htmlFor={id}>{labelText}</label>
		</div>
	);
}
