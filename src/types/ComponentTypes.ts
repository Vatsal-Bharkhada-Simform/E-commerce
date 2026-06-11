import type { ReactElement } from "react";

export type ListItemType = {
	title: string;
	href?: string;
	icon: ReactElement;
	isActive: boolean;
};
