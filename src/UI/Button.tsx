type Variant = "DISPLAY" | "PRIMARY" | "SECONDARY" | "GHOST" | "DANGER";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: Variant;
}

const buttonClassNames: Record<Variant, string> = {
	DISPLAY:
		"bg-accent hover:bg-accent-hover text-white cursor-pointer px-4 py-2 rounded-xl text-md transition-all duration-300 shadow-primary",
	PRIMARY:
		"flex justify-center items-center gap-2 bg-accent text-white cursor-pointer px-4 py-3 rounded-2xl text-md transition-all duration-300",
	SECONDARY:
		"flex justify-center items-center gap-2 bg-card text-text-main cursor-pointer px-4 py-3  border border-border rounded-2xl text-md transition-all duration-300",
	GHOST: "flex justify-center items-center gap-2 bg-transparent text-text-main cursor-pointer px-4 py-2 border-none rounded-2xl text-md transition-all duration-300 hover:bg-accent/10",
	DANGER: "bg-red-100 hover:bg-red-200 text-red-700 cursor-pointer px-4 py-1.5  border border-red-200 rounded-xl text-md transition-all duration-300",
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
