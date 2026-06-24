import type {
	ProductListState,
	ProductWithAdditionalData,
} from "./productTypes";

type ProductContextType = {
	products: ProductListState;
	selectedProduct: ProductWithAdditionalData | null;
	clearSelectedProduct: () => void;
	setProduct: (product: ProductWithAdditionalData) => void;
};

export type { ProductContextType };
