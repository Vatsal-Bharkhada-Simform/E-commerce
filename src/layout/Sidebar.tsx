import {
	Heart,
	HomeSmile,
	Package,
	ShoppingBag01,
	UserCircle,
} from "@untitledui/icons";
import type { ListItemType } from "../types/ComponentTypes";
import { NavList } from "../components/NavList";

const navListContent: Array<ListItemType> = [
	{
		title: "Home",
		icon: <HomeSmile className="w-5" />,
		isActive: true,
	},
	{
		title: "Products",
		icon: <Package className="w-5" />,
		isActive: false,
	},
	{
		title: "Wishlist",
		icon: <Heart className="w-5" />,
		isActive: false,
	},
	{
		title: "Orders",
		icon: <ShoppingBag01 className="w-5" />,
		isActive: false,
	},
	{
		title: "Account",
		icon: <UserCircle className="w-5" />,
		isActive: false,
	},
];

export function SideBar() {
	return (
		<aside className="flex flex-col h-full min-w-2xs p-4 gap-4 border-r border-r-gray-200">
			<div className="flex items-center gap-2 py-4">
				<h1 className="text-text-main font-bold text-4xl">Ferio</h1>
			</div>

			<NavList>
				{navListContent.map((item) => (
					<NavList.ListItem {...item} key={item.title} />
				))}
			</NavList>
		</aside>
	);
}
