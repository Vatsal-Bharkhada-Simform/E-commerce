import { useEffect, useMemo, useState, type ReactElement } from "react";
import type { ProductList, ProductListState } from "../types/productTypes";
import { productInstance } from "../API/axios";
import toast from "react-hot-toast";
import { ProductsContext } from "./ProductsContext";

export function ProductsContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [products, setProducts] = useState<ProductListState>([]);

	useEffect(() => {
		async function fetchProducts() {
			const response = await productInstance.get<ProductList>(
				"/products?offset=0&limit=30"
			);
			if (response.status === 200) {
				setProducts(
					response.data.map((item) => {
						return {
							...item,
							discount: Math.round((Math.random() / 2) * 100),
						};
					})
				);
			} else {
				toast.error("Error while fetching data");
			}
		}
		fetchProducts();
	}, []);

	const ctxValue = useMemo(() => {
		return {
			products,
		};
	}, [products]);

	return (
		<ProductsContext.Provider value={ctxValue}>
			{children}
		</ProductsContext.Provider>
	);
}
