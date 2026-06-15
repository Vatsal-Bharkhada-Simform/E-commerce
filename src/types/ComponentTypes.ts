import type { ReactElement } from "react";

export type NavButton = {
	type: "NAV_BUTTON";
	title: string;
	href?: string;
	icon: ReactElement;
	isActive: boolean;
};
export type NavDropdown = {
	type: "NAV_DROPDOWN";
	title: string;
	items: Array<NavButton>;
	icon: ReactElement;
	isActive: boolean;
};

export type ListItemType = NavButton | NavDropdown;
