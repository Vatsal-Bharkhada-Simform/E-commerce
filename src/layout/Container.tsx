import type { ReactNode } from "react";

type ContainerProps = {
	children: ReactNode;
	type: "ROW" | "COLUMN";
	className?: string;
};

export function Container({ children, type, className }: ContainerProps) {
	return (
		<div
			className={`w-full overflow-hidden text-gray-900 bg-white flex ${type === "COLUMN" ? "flex-col" : "flex-row"} ${className ?? ""}`}
		>
			{children}
		</div>
	);
}
