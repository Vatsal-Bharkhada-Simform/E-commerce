import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../components/ProductCard";
import type { ProductListState } from "../types/productTypes";
import { useProductFilters } from "../hooks/useProductFilters";
import { fetchAllProducts } from "../API/services/fetchProducts";

export function Products() {
	const { sortAndFilterProducts } = useProductFilters();
	const {
		data: products,
		isLoading,
		error,
		isPending,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllProducts,
		staleTime: 3_000_000,
	});

	if (error) {
		throw new Error("Failed to fetch product data: " + error.message);
	}

	if (isLoading || isPending) {
		return (
			<div className="col-span-4 flex p-20 justify-center items-center text-xl bg-accent/10 text-accent rounded-4xl mt-8">
				Loading Products...
			</div>
		);
	}

	let productsToDisplay: ProductListState = products;

	productsToDisplay = sortAndFilterProducts(productsToDisplay);

	return (
		<>
			<div className="pt-8 pb-4 px-2 text-lg text-gray-600">
				{productsToDisplay.length > 0 &&
					`Showing ${productsToDisplay.length} out of ${Math.max(productsToDisplay.length, 200)} products`}
			</div>
			<div className="grid sm:grid-cols-3 md:grid-cols-4 gap-8">
				{productsToDisplay.length === 0 ? (
					<div className="col-span-4 flex p-20 justify-center items-center text-xl bg-accent/10 text-accent rounded-4xl">
						Nothing to show
					</div>
				) : (
					productsToDisplay.map((product) => {
						return (
							<ProductCard product={product} key={product.id} />
						);
					})
				)}
			</div>
		</>
	);
}
