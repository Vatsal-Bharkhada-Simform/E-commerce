import { AxiosError, type AxiosResponse } from "axios";
import { ProductListValidator } from "../validators/ProductValidator";
import z from "zod";
import type { ProductList } from "../types/productTypes";

function sanitizeData(response: AxiosResponse<ProductList>) {
	console.log(response.data);
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
}

export { sanitizeData, handleResponseError };
