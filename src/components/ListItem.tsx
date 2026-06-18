import type { NavButtonType } from "../types/ComponentTypes";

export function ListItem({ title, href = "#", icon, isActive }: NavButtonType) {
	return (
		<li>
			<a
				href={href}
				className={`flex gap-2 items-center p-4 font-medium  rounded-2xl transition-all ${isActive ? "font-semibold bg-accent-light text-accent-hover" : "text-gray-500 bg-white hover:bg-accent-light"}`}
			>
				{icon}
				{title}
			</a>
		</li>
	);
}
