type Variant = "PRIMARY" | "SECONDARY";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: Variant;
}

const buttonClassNames: Record<Variant, string> = {
	PRIMARY:
		"bg-accent text-white cursor-pointer px-4 py-3 rounded-2xl text-md transition-all duration-300",
	SECONDARY:
		"bg-card text-text-main cursor-pointer px-4 py-3  border border-border rounded-2xl text-md transition-all duration-300",
};

export default function Button({
	variant,
	className = "",
	...props
}: ButtonProps) {
	return (
		<button
			className={`${buttonClassNames[variant]} ${className ?? ""}`}
			{...props}
		>
			{props.children}
		</button>
	);
}
