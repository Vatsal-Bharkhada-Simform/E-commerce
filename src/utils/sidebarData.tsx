import { HomeSmile, ShoppingBag01 } from "@untitledui/icons";
import type { ListItemType } from "../types/ComponentTypes";
import { Heart, Package, UserCircle } from "lucide-react";

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

export const priceOptions = {
	PRICE_ANY: {
		lowerPriceLimit: 0,
		upperPriceLimit: NaN,
		textToDisplay: "Any",
		pathString: "any",
	},
	PRICE_BELOW_20: {
		lowerPriceLimit: 0,
		upperPriceLimit: 20,
		textToDisplay: "Below $20",
		pathString: "below_20",
	},
	PRICE_20_TO_50: {
		lowerPriceLimit: 20,
		upperPriceLimit: 50,
		textToDisplay: "$20 - $50",
		pathString: "20_to_50",
	},
	PRICE_50_TO_100: {
		lowerPriceLimit: 50,
		upperPriceLimit: 100,
		textToDisplay: "$50 - $100",
		pathString: "50_to_100",
	},
} as const;

export const validSortPaths = Object.values(sortOptions).map(
	(opt) => opt.pathString
);
export const validPricePaths = Object.values(priceOptions).map(
	(opt) => opt.pathString
);
