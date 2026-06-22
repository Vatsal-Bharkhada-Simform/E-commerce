import { AxiosError, type AxiosResponse } from "axios";
import z from "zod";
import { ProductListValidator } from "../validators/ProductValidator";
import type { ProductList } from "../types/productTypes";

function sanitizeData(response: AxiosResponse<ProductList>) {
	response.data = ProductListValidator.parse(response.data);
	return response;
}

function handleResponseError(err: AxiosError | z.ZodError) {
	if (err instanceof z.ZodError) {
		console.error(err.issues);
	} else if (err instanceof AxiosError) {
		console.error(err.message);
		console.error(err.cause);
	}
	throw new Error(err.message);
}

export { sanitizeData, handleResponseError };
