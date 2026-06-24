import { HomeSmile, ShoppingBag01 } from "@untitledui/icons";
import type { ListItemType } from "../types/ComponentTypes";
import { Heart, Package, UserCircle } from "lucide-react";

export const sortOptions = {
	RELEVANCE: {
		name: "Relevance",
		pathString: "relevance",
	},
	LOW_TO_HIGH: {
		name: "Price: Low to High",
		pathString: "price_low_to_high",
	},
	HIGH_TO_LOW: {
		name: "Price: High to Low",
		pathString: "price_high_to_low",
	},
} as const;

export const navListContent: Array<ListItemType> = [
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
