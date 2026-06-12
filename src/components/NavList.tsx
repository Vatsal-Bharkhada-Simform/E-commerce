import {
	Heart,
	HomeSmile,
	Package,
	ShoppingBag01,
	UserCircle,
} from "@untitledui/icons";
import type { ListItemType } from "../types/ComponentTypes";
import { ListItem } from "./ListItem";

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

export function NavList() {
	return (
		<nav>
			<ul className="list-none flex flex-col flex-1 gap-2">
				{navListContent.map((item) => (
					<ListItem {...item} key={item.title} />
				))}
			</ul>
		</nav>
	);
}
