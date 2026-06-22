import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export function useProducts() {
	const context = useContext(ProductsContext);

	if (context.products === null) {
		throw new Error("Context does not exist for current scope!");
	}

	return context;
}
