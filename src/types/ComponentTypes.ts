import type { ReactElement } from "react";

export type NavButtonType = {
	type: "NAV_BUTTON";
	title: string;
	href?: string;
	icon: ReactElement;
	isActive: boolean;
};
export type NavDropdownType = {
	type: "NAV_DROPDOWN";
	title: string;
	items: Array<NavButtonType>;
	icon: ReactElement;
	isActive: boolean;
};

export type ListItemType = NavButtonType | NavDropdownType;
