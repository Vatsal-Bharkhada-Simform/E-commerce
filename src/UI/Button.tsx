type Variant = "PRIMARY" | "SECONDARY" | "GHOST";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: Variant;
}

const buttonClassNames: Record<Variant, string> = {
	PRIMARY:
		"flex justify-center items-center gap-2 bg-accent text-white cursor-pointer px-4 py-3 rounded-2xl text-md transition-all duration-300",
	SECONDARY:
		"flex justify-center items-center gap-2 bg-card text-text-main cursor-pointer px-4 py-3  border border-border rounded-2xl text-md transition-all duration-300",
	GHOST: "flex justify-center items-center gap-2 bg-transparent text-text-main cursor-pointer px-4 py-2 border-none rounded-2xl text-md transition-all duration-300 hover:bg-accent/10",
};

export default function Button({
	variant,
	className = "",
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={`${buttonClassNames[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
