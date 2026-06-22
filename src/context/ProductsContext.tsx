import { createContext } from "react";
import type { ProductContextType } from "../types/contextTypes";

const ProductsContext = createContext<ProductContextType | null>(null);

export { ProductsContext };
