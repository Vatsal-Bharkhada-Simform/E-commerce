import { useMemo } from "react";
import { useSearchParams } from "react-router";
import type { NavButtonType } from "../types/ComponentTypes";
import { NavList } from "../components/NavList";
import { useProducts } from "../context/useProducts";
import { navListContent, sortOptions } from "../utils/sidebarData";

export function SideBar() {
	const { products } = useProducts();
	const [searchParams, setSearchParams] = useSearchParams();

	const currentSort = searchParams.get("sort");

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
		<aside className="flex flex-col h-full min-w-2xs p-4 gap-4 border-r border-r-gray-200 justify-between">
			<NavList>
				{listContent.map((item) => {
					if (item.type === "NAV_DROPDOWN") {
						return <NavList.Dropdown {...item} key={item.title} />;
					}
					return <NavList.ListItem {...item} key={item.title} />;
				})}
			</NavList>
			<div className="p-4 flex flex-col gap-4">
				<span className="uppercase tracking-wider text-sm text-gray-500">
					Sort by
				</span>
				<div className="flex flex-col gap-3">
					{Object.entries(sortOptions).map(([, option]) => (
						<div
							className="flex gap-2 items-center"
							key={option.name}
						>
							<input
								type="radio"
								title={option.name}
								id={`sortOption:${option.name}`}
								onChange={() => {
									const updatedParams = new URLSearchParams(
										searchParams
									);
									if (option.pathString === "relevance") {
										updatedParams.delete("sort");
									} else {
										updatedParams.set(
											"sort",
											option.pathString
										);
									}
									setSearchParams(updatedParams);
								}}
								checked={
									currentSort === option.pathString ||
									(!currentSort &&
										option.pathString === "relevance")
								}
								className="accent-accent"
							/>
							<label htmlFor={`sortOption:${option.name}`}>
								{option.name}
							</label>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
}
