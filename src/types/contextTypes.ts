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

type FilterContextType = {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export type { ProductContextType, FilterContextType };
