import { useSearchParams } from "react-router";
import {
	priceOptions,
	sortOptions,
	validPricePaths,
	validSortPaths,
} from "../utils/sidebarData";
import type { ProductListState } from "../types/productTypes";
import { useCallback } from "react";

type SortPathType = (typeof validSortPaths)[number];
type PricePathType = (typeof validPricePaths)[number];

export function useProductFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	const searchQuery = searchParams.get("q");
	const sortParam = searchParams.get("sort") as SortPathType;
	const priceParam = searchParams.get("price") as PricePathType;

	const setSearchQuery = useCallback(
		function setSearchQuery(query: string) {
			setSearchParams((prevParams) => {
				const updatedParams = new URLSearchParams(prevParams);
				updatedParams.set("q", query);
				return updatedParams;
			});
		},
		[setSearchParams]
	);

	const setSortParam = useCallback(
		function setSortParam(sortPathString: SortPathType) {
			setSearchParams((prevParams) => {
				console.log(prevParams);
				const updatedParams = new URLSearchParams(prevParams);
				if (sortPathString === sortOptions.RELEVANCE.pathString) {
					console.log("HERE");
					updatedParams.delete("sort");
				} else {
					updatedParams.set("sort", sortPathString);
				}
				return updatedParams;
			});
		},
		[setSearchParams]
	);

	const setPriceParam = useCallback(
		function setPriceParam(pricePathString: PricePathType) {
			setSearchParams((prevParams) => {
				const updatedParams = new URLSearchParams(prevParams);
				if (pricePathString === priceOptions.PRICE_ANY.pathString) {
					updatedParams.delete("price");
				} else {
					updatedParams.set("price", pricePathString);
				}
				return updatedParams;
			});
		},
		[setSearchParams]
	);

	const resetParams = useCallback(
		function resetParams() {
			setSearchParams((prevParams) => {
				const clearedParams = new URLSearchParams(prevParams);
				clearedParams.delete("sort");
				clearedParams.delete("price");
				return clearedParams;
			});
		},
		[setSearchParams]
	);

	const sortAndFilterProducts = useCallback(
		function sortAndFilterProducts(products: ProductListState) {
			let productsToDisplay: ProductListState = products;

			if (searchQuery) {
				productsToDisplay = products.filter((product) =>
					product.title
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				);
			}

			if (
				priceParam &&
				validPricePaths.includes(priceParam as PricePathType)
			) {
				const selectedPriceOption = Object.values(priceOptions).find(
					(option) => option.pathString === priceParam
				);
				if (selectedPriceOption) {
					productsToDisplay = productsToDisplay.filter((product) => {
						const discountedPrice =
							product.price -
							(product.price * product.discount) / 100;

						return (
							discountedPrice >
								selectedPriceOption.lowerPriceLimit &&
							discountedPrice <=
								selectedPriceOption.upperPriceLimit
						);
					});
				}
			}

			if (
				sortParam &&
				validSortPaths.includes(sortParam as SortPathType)
			) {
				if (sortParam === sortOptions.LOW_TO_HIGH.pathString) {
					productsToDisplay = productsToDisplay.toSorted(
						(a, b) => a.price - b.price
					);
				} else if (sortParam === sortOptions.HIGH_TO_LOW.pathString) {
					productsToDisplay = productsToDisplay.toSorted(
						(a, b) => b.price - a.price
					);
				}
			}

			return productsToDisplay;
		},
		[sortParam, priceParam, searchQuery]
	);

	return {
		searchQuery,
		sortParam,
		priceParam,
		setSearchQuery,
		setSortParam,
		setPriceParam,
		resetParams,
		sortAndFilterProducts,
	};
}
