import type { ReactNode } from "react";
import { ListItem } from "./ListItem";

function NavList({ children }: { children: ReactNode }) {
	return (
		<nav>
			<ul className="list-none flex flex-col flex-1 gap-2">{children}</ul>
		</nav>
	);
}

NavList.ListItem = ListItem;

export { NavList };
