import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelText?: string;
	errorText?: string;
}

export function Input({
	labelText = "",
	errorText = "",
	type,
	...props
}: InputProps) {
	const id = useId();
	const hasError = errorText.trim() !== "";

	return (
		<div className={`flex flex-col gap-1 ${type !== "checkbox" && "mb-4"}`}>
			{labelText.trim() && (
				<label
					htmlFor={props.id ?? id}
					className={`md:text-md font-inter tracking-tight text-primary leading-none ${hasError ? "text-red-500" : "text-gray-700"}`}
				>
					{labelText}
					{props.required && (
						<span className="text-sm text-red-500 pl-1">*</span>
					)}
				</label>
			)}
			<input
				type={type}
				className={`w-full px-3 py-1.5 text-md text-gray-800 bg-gray-50 border-2 border-gray-300 focus:border-accent/70 outline-0 focus:outline-3 outline-accent/20 rounded-xl leading-none transition-all duration-100 
                    ${hasError && "border-red-300 focus:border-red-300 focus:outline-2 outline-red-100"}
                    `}
				{...props}
				id={props.id ?? id}
			/>
			{hasError && (
				<span className="text-sm text-gray-500 leading-none">
					{errorText}
				</span>
			)}
		</div>
	);
}
