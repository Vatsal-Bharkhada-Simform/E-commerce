import type { ListItemType } from "../types/ComponentTypes";

export function ListItem({ title, href = "#", icon, isActive }: ListItemType) {
	return (
		<li>
			<a
				href={href}
				className={`flex gap-2 items-center p-2 font-medium  rounded-lg transition-all ${isActive ? "bg-blue-100 text-blue-600 hover:text-blue-600" : "text-gray-500 bg-white hover:bg-blue-50 hover:text-gray-700"}`}
			>
				{icon}
				{title}
			</a>
		</li>
	);
}
