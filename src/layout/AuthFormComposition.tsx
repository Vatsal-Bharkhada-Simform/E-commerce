import type { ReactNode } from "react";

type AuthFormComposition_Type = {
	header: string;
	description: string;
	headerAddOn?: ReactNode;
	children: ReactNode;
	navigationOption: ReactNode;
};

export function AuthFormComposition({
	header,
	description,
	headerAddOn = "",
	children,
	navigationOption,
}: AuthFormComposition_Type) {
	return (
		<div className="flex flex-col gap-6 items-center">
			<div className="w-2xl flex flex-col gap-8 border border-gray-200 p-8 rounded-4xl shadow-card">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-semibold">{header}</h1>
					<p className="text-gray-600">{description}</p>
					{headerAddOn}
				</div>
				<div className="w-full max-h-[60vh] overflow-hidden flex flex-col gap-2">
					{children}
				</div>
			</div>
			<div className="text-base">{navigationOption}</div>
		</div>
	);
}
