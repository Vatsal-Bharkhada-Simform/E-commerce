import type {
	Product,
	ProductList,
	ProductListState,
	ProductWithAdditionalData,
} from "../../types/productTypes";
import { reduceStringToInteger } from "../../utils/reduceStringtoInteger";
import {
	ProductListValidator,
	ProductValidator,
} from "../../validators/ProductValidator";
import { productInstance } from "../axios";

const MAX_DISCOUNT = 50;

export async function fetchAllProducts(): Promise<ProductListState> {
	try {
		const response = await productInstance.get<ProductList>(
			"/products?offset=0&limit=30"
		);

		if (response.status !== 200) {
			throw new Error(`Unexpected status code: ${response.status}`);
		}

		const parsedData = ProductListValidator.safeParse(response.data);
		if (!parsedData.success) {
			console.error("Zod Validation Error:", parsedData.error.message);
			throw new Error("Received malformed product data from the server.");
		}
		return parsedData.data.map((item) => {
			const discount = reduceStringToInteger(item.title) % MAX_DISCOUNT;
			return {
				...item,
				discount, // Mock discount
				discountedPrice: item.price - (item.price * discount) / 100,
			};
		});
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "An unknown error occurred";
		console.error(errorMessage);
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
			console.error("Zod Validation Error:", parsedData.error.message);
			throw new Error("Received malformed product data from the server.");
		}
		const discount =
			reduceStringToInteger(parsedData.data.title) % MAX_DISCOUNT;
		return {
			...parsedData.data,
			discount, // Mock discount
			discountedPrice:
				parsedData.data.price -
				(parsedData.data.price * discount) / 100,
		};
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "An unknown error occurred";
		console.error(errorMessage);
		throw err;
	}
}
