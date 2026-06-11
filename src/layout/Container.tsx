import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
	return (
		<div className="w-full h-screen flex flex-col overflow-hidden text-gray-900 bg-white">
			{children}
		</div>
	);
}
