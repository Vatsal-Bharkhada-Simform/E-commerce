import {
	Heart,
	HomeSmile,
	Package,
	ShoppingBag01,
	UserCircle,
} from "@untitledui/icons";
import type { ListItemType, NavButtonType } from "../types/ComponentTypes";
import { NavList } from "../components/NavList";
import { useProducts } from "../context/useProducts";
import { useMemo } from "react";

const navListContent: Array<ListItemType> = [
	{
		type: "NAV_BUTTON",
		title: "Home",
		icon: <HomeSmile className="w-5" />,
		isActive: true,
	},
	{
		type: "NAV_DROPDOWN",
		title: "Products",
		icon: <Package className="w-5" />,
		isActive: false,
		items: [],
	},
	{
		type: "NAV_BUTTON",
		title: "Wishlist",
		icon: <Heart className="w-5" />,
		isActive: false,
	},
	{
		type: "NAV_BUTTON",
		title: "Orders",
		icon: <ShoppingBag01 className="w-5" />,
		isActive: false,
	},
	{
		type: "NAV_BUTTON",
		title: "Account",
		icon: <UserCircle className="w-5" />,
		isActive: false,
	},
];

export function SideBar() {
	const { products } = useProducts();

	const categories = useMemo(
		() =>
			Array.from(
				new Set(products.map((product) => product.category.name))
			),
		[products]
	);

	const categoryItems: Array<NavButtonType> = useMemo(
		() =>
			categories.map((category) => {
				return {
					icon: <></>,
					title: category,
					isActive: false,
					type: "NAV_BUTTON",
				};
			}),
		[categories]
	);

	const listContent = useMemo(
		() =>
			navListContent.map((item) => {
				if (item.type === "NAV_DROPDOWN" && item.title === "Products") {
					return {
						...item,
						items: categoryItems,
					};
				} else return item;
			}),
		[categoryItems]
	);

	return (
		<aside className="flex flex-col h-full min-w-2xs p-4 gap-4 border-r border-r-gray-200">
			<NavList>
				{listContent.map((item) => {
					if (item.type === "NAV_DROPDOWN") {
						return <NavList.Dropdown {...item} key={item.title} />;
					}
					return <NavList.ListItem {...item} key={item.title} />;
				})}
			</NavList>
		</aside>
	);
}
