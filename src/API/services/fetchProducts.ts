import toast from "react-hot-toast";
import type {
	Product,
	ProductList,
	ProductListState,
	ProductWithAdditionalData,
} from "../../types/productTypes";
import { productInstance } from "../axios";
import {
	ProductListValidator,
	ProductValidator,
} from "../../validators/ProductValidator";

export async function fetchAllProducts(): Promise<ProductListState> {
	try {
		const response = await productInstance.get<ProductList>(
			"/products?offset=0&limit=30"
		);

		console.log(response);

		if (response.status !== 200) {
			throw new Error(`Unexpected status code: ${response.status}`);
		}

		const parsedData = ProductListValidator.safeParse(response.data);
		if (!parsedData.success) {
			console.error("Zod Validation Error:", parsedData.error.message);
			throw new Error("Received malformed product data from the server.");
		}
		return parsedData.data.map((item) => {
			const discount = Math.round((Math.random() / 2) * 100);
			return {
				...item,
				discount, // Mock discount generation
				discountedPrice: item.price - (item.price * discount) / 100,
			};
		});
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "An unknown error occurred";
		toast.error(`Error while fetching data: ${errorMessage}`);

		throw err;
	}
}

export async function fetchProductsById(
	id: number
): Promise<ProductWithAdditionalData> {
	try {
		const response = await productInstance.get<Product>(`/products/${id}`);

		if (response.status !== 200) {
			throw new Error(`Unexpected status code: ${response.status}`);
		}

		const parsedData = ProductValidator.safeParse(response.data);
		if (!parsedData.success) {
			console.error("Zod Validation Error:", parsedData.error.format());
			throw new Error("Received malformed product data from the server.");
		}
		const discount = Math.round((Math.random() / 2) * 100);
		return {
			...parsedData.data,
			discount, // Mock discount generation
			discountedPrice:
				parsedData.data.price -
				(parsedData.data.price * discount) / 100,
		};
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "An unknown error occurred";
		toast.error(`Error while fetching data: ${errorMessage}`);

		throw err;
	}
}
