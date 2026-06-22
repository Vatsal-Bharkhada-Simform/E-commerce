import { createContext } from "react";
import type { ProductContextType } from "../types/contextTypes";

const ProductsContext = createContext<ProductContextType>({
	products: null,
});

export { ProductsContext };
