import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	type: "ROW" | "COLUMN";
	className?: string;
}

export function Container({
	children,
	type,
	className,
	...props
}: ContainerProps) {
	return (
		<div
			className={`w-full overflow-hidden text-gray-900 bg-white flex ${type === "COLUMN" ? "flex-col" : "flex-row"} ${className ?? ""}`}
			{...props}
		>
			{children}
		</div>
	);
}
