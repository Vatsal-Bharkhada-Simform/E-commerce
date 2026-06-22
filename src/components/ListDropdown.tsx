import { useMemo, useState } from "react";
import { ChevronDown } from "@untitledui/icons";
import type { NavDropdownType } from "../types/ComponentTypes";
import { NavList } from "./NavList";

export function NavDropdown({ title, isActive, items, icon }: NavDropdownType) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dropdownItems = useMemo(() => {
		return items.map((item) => {
			return <NavList.ListItem {...item} key={item.title} />;
		});
	}, [items]);

	return (
		<li>
			<button
				className={`flex w-full justify-between items-center p-4 font-medium rounded-2xl cursor-pointer transition-all ${isOpen && "mb-2"} ${isActive ? "font-semibold bg-accent-light text-accent-hover" : "text-gray-500 bg-white hover:bg-accent-light"}`}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span className="flex items-center gap-2">
					{icon}
					{title}
				</span>
				<span className="justify-self-end">
					<ChevronDown
						size={20}
						className={`transition-all ${isOpen ? "rotate-180" : "rotate-0"}`}
					/>
				</span>
			</button>
			<ul className="ml-6 pl-4 flex flex-col gap-2 border-l border-l-border">
				{isOpen && dropdownItems}
			</ul>
		</li>
	);
}
