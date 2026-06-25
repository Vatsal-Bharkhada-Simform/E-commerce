import { useSearchParams } from "react-router";
import {
	priceOptions,
	sortOptions,
	validPricePaths,
	validSortPaths,
} from "../utils/sidebarData";
import type { ProductListState } from "../types/productTypes";

type SortPathType = (typeof validSortPaths)[number];
type PricePathType = (typeof validPricePaths)[number];

export function useProductParams() {
	const [searchParams, setSearchParams] = useSearchParams();

	const sortParam = searchParams.get("sort") as SortPathType;
	const priceParam = searchParams.get("price") as PricePathType;

	function setSortParam(sortPathString: SortPathType) {
		const updatedParams = new URLSearchParams(searchParams);
		if (sortPathString === "relevance") {
			updatedParams.delete("sort");
		} else {
			updatedParams.set("sort", sortPathString);
		}
		setSearchParams(updatedParams);
	}

	function setPriceParam(pricePathString: PricePathType) {
		const updatedParams = new URLSearchParams(searchParams);
		if (pricePathString === "any") {
			updatedParams.delete("price");
		} else {
			updatedParams.set("price", pricePathString);
		}
		setSearchParams(updatedParams);
	}

	function sortAndFilterProducts(products: ProductListState) {
		let productsToDisplay: ProductListState = products;

		if (sortParam) {
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

		if (
			priceParam &&
			validPricePaths.includes(priceParam as PricePathType)
		) {
			const selectedPriceOption = Object.values(priceOptions).find(
				(option) => option.pathString === priceParam
			);
			productsToDisplay = productsToDisplay.filter((product) => {
				const discountedPrice =
					product.price - (product.price * product.discount) / 100;

				return (
					discountedPrice > selectedPriceOption.lowerPriceLimit &&
					discountedPrice <= selectedPriceOption.upperPriceLimit
				);
			});
		}
		return productsToDisplay;
	}

	return {
		sortParam,
		priceParam,
		setSortParam,
		setPriceParam,
		sortAndFilterProducts,
	};
}
