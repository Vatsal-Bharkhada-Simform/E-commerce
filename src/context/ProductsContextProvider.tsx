import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import toast from "react-hot-toast";
import type {
	Product,
	ProductList,
	ProductListState,
} from "../types/productTypes";
import { productInstance } from "../API/axios";
import { ProductsContext } from "./ProductsContext";
import axios from "axios";

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
				setProducts(
					response.data.map((item) => {
						return {
							...item,
							discount: Math.round((Math.random() / 2) * 100), // Mock discount generation
						};
					})
				);
			} catch (err) {
				if (err instanceof Error) {
					toast.error(`Error while fetching data: ${err.message}`);
				}
			}
		}
		fetchProducts();

		return () => controller.abort();
	}, []);

	const getProductById = useCallback(async function getProductById(
		id: number
	) {
		try {
			const response = await axios.get<Product>(
				`https://api.escuelajs.co/api/v1/products/${id}`
			);
			return {
				...response.data,
				discount: Math.round((Math.random() / 2) * 100), // Mock discount generation
			};
		} catch (err) {
			if (err instanceof Error) {
				toast.error(`Error while fetching data: ${err.message}`);
			}
		}
	}, []);

	const ctxValue = useMemo(
		() => ({
			products,
			getProductById,
		}),
		[products, getProductById]
	);

	return (
		<ProductsContext.Provider value={ctxValue}>
			{children}
		</ProductsContext.Provider>
	);
}
