// ==========================================
//           SKIP THIS FILE
// ==========================================

import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	labelText?: string;
	errorText?: string;
}

export function PasswordInput({
	labelText = "",
	errorText = "",
	...props
}: InputProps) {
	const [showPassword, setShowPassword] = useState(false);
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
			<div
				className={`flex px-3 py-1 text-md text-gray-800 bg-gray-50 border-2 border-gray-300 focus-within:border-accent/70 outline-0 focus-within:outline-3 outline-accent/20 rounded-xl leading-none transition-all duration-100 
                        ${hasError && "border-red-300 focus-within:border-red-300 focus-within:outline-2 outline-red-100"}`}
			>
				<input
					type={showPassword ? "text" : "password"}
					className="outline-none flex-1"
					{...props}
					id={props.id ?? id}
				/>
				<button
					onClick={() => setShowPassword((prev) => !prev)}
					className="p-1 cursor-pointer"
					title="Toggle passoword visibility"
					type="button"
				>
					{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
				</button>
			</div>
			{hasError && (
				<span className="text-sm text-gray-500 leading-none">
					{errorText}
				</span>
			)}
		</div>
	);
}
