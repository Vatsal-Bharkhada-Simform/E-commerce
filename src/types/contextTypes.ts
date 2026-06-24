import type {
	ProductListState,
	ProductWithAdditionalData,
} from "./productTypes";

type ProductContextType = {
	products: ProductListState;
	getProductById: (id: number) => ProductWithAdditionalData;
};

type FilterContextType = {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export type { ProductContextType, FilterContextType };
