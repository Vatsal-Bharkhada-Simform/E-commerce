import { useEffect, useMemo, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import type { ProductList, ProductListState } from "../types/productTypes";
import { productInstance } from "../API/axios";
import { ProductsContext } from "./ProductsContext";

export function ProductsContextProvider({ children }: { children: ReactNode }) {
	const [products, setProducts] = useState<ProductListState>([]);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchProducts() {
			try {
				const response = await productInstance.get<ProductList>(
					"/products?offset=0&limit=30",
					{
						signal: controller.signal,
					}
				);
				if (response.status === 200) {
					setProducts(
						response.data.map((item) => {
							return {
								...item,
								discount: Math.round((Math.random() / 2) * 100), // Mock discount generation
							};
						})
					);
				} else {
					toast.error("Error while fetching data");
				}
			} catch (err) {
				if (err instanceof Error) {
					toast.error(`Error while fetching data: ${err.message}`);
				}
			}
		}
		fetchProducts();

		return () => controller.abort();
	}, []);

	const ctxValue = useMemo(
		() => ({
			products,
		}),
		[products]
	);

	return (
		<ProductsContext.Provider value={ctxValue}>
			{children}
		</ProductsContext.Provider>
	);
}
