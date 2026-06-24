import { useId } from "react";

interface SelectProps<
	T extends Array<string>,
> extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: T;
	defaultSelected?: T[number];
	defaultOptionText?: string;
	labelText?: string;
	errorText?: string;
}

export function Select<const T extends Array<string>>({
	options,
	defaultSelected,
	defaultOptionText,
	labelText = "",
	errorText = "",
	...props
}: SelectProps<T>) {
	const id = useId();
	const hasError = errorText.trim() !== "";

	return (
		<div className="flex flex-col gap-1 mb-4">
			{labelText.trim() && (
				<label
					htmlFor={props.id ?? id}
					className={`md:text-md font-inter tracking-tight text-primary leading-none ${hasError && "text-red-500"}`}
				>
					{labelText}
					{props.required && (
						<span className="text-sm text-red-500 pl-1">*</span>
					)}
				</label>
			)}
			<select
				className={`w-full px-3 py-1.5 text-md text-gray-800 bg-gray-50 border-2 border-gray-300 focus:border-accent/70 outline-0 focus:outline-3 outline-accent/20 rounded-xl leading-none transition-all duration-100 
                    ${hasError && "border-red-300 focus:border-red-300 focus:outline-2 outline-red-100"}
                `}
				defaultValue={defaultSelected ?? defaultOptionText ?? "Select"}
				{...props}
				id={props.id ?? id}
			>
				<option value={defaultOptionText} disabled>
					{defaultOptionText ?? "Select"}
				</option>
				{options.map((option) => {
					return (
						<option value={option} key={option}>
							{option}
						</option>
					);
				})}
			</select>
			{hasError && (
				<span className="text-sm text-gray-500 leading-none">
					{errorText}
				</span>
			)}
		</div>
	);
}
