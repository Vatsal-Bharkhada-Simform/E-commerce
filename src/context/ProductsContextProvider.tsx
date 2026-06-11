import { useEffect, useMemo, useState, type ReactElement } from "react";
import type { ProductList } from "../types/productTypes";
import { productInstance } from "../API/axios";
import toast from "react-hot-toast";
import { ProductsContext } from "./ProductsContext";

export function ProductsContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [products, setProducts] = useState<ProductList>([]);

	useEffect(() => {
		async function fetchProducts() {
			const response =
				await productInstance.get<ProductList>("/products");
			if (response.status === 200) {
				setProducts(response.data);
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
