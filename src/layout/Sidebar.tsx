import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { NavButtonType } from "../types/ComponentTypes";
import { NavList } from "../components/NavList";
import {
	navListContent,
	priceOptions,
	sortOptions,
} from "../utils/sidebarData";
import { useProductFilters } from "../hooks/useProductFilters";
import { RadioButton } from "../components/RadioButton";
import Button from "../UI/Button";
import { fetchAllProducts } from "../API/services/fetchProducts";

export function SideBar() {
	const { sortParam, priceParam, setSortParam, setPriceParam, resetParams } =
		useProductFilters();

	const { data: products = [], error } = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllProducts,
		staleTime: 3_000_000,
	});

	if (error) {
		throw new Error("Failed to fetch product data: " + error.message);
	}

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
		<aside className="flex flex-col h-full min-w-2xs p-4 gap-4 border-r border-r-gray-200 justify-between overflow-y-auto">
			<NavList>
				{listContent.map((item) => {
					if (item.type === "NAV_DROPDOWN") {
						return <NavList.Dropdown {...item} key={item.title} />;
					}
					return <NavList.ListItem {...item} key={item.title} />;
				})}
			</NavList>
			<div className="text-gray-600">
				<div className="flex justify-between">
					<span className="uppercase tracking-wider p-2">
						Filters
					</span>
					<Button
						variant="GHOST"
						title="Clear filters"
						onClick={resetParams}
					>
						Clear filters
					</Button>
				</div>
				<div className="pl-4">
					<div className="border-l border-l-border">
						<div className="p-4 flex flex-col gap-4">
							<span className="uppercase tracking-wider text-sm text-gray-500">
								Sort by
							</span>
							<div className="flex flex-col gap-3">
								{Object.entries(sortOptions).map(
									([, option]) => (
										<RadioButton
											key={option.pathString}
											labelText={option.name}
											id={`sortOption:${option.name}`}
											onChange={() =>
												setSortParam(option.pathString)
											}
											checked={
												sortParam ===
													option.pathString ||
												(!sortParam &&
													option.pathString ===
														"relevance")
											}
											className="accent-accent"
										/>
									)
								)}
							</div>
						</div>
						<div className="p-4 flex flex-col gap-4">
							<span className="uppercase tracking-wider text-sm text-gray-500">
								Price
							</span>
							<div className="flex flex-col gap-3">
								{Object.entries(priceOptions).map(
									([, option]) => (
										<RadioButton
											key={option.pathString}
											labelText={option.textToDisplay}
											id={`priceOption:${option.textToDisplay}`}
											onChange={() =>
												setPriceParam(option.pathString)
											}
											checked={
												priceParam ===
													option.pathString ||
												(!priceParam &&
													option.pathString === "any")
											}
											className="accent-accent"
										/>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}
