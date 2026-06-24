interface Category {
	id: number;
	name: string;
	image: string;
	slug: string;
}

interface Product {
	id: number;
	title: string;
	slug: string;
	price: number;
	description: string;
	category: Category;
	images: string[];
}

interface ProductWithAdditionalData extends Product {
	discount: number;
}

type ProductList = Array<Product>;
type ProductListState = Array<ProductWithAdditionalData>;

export const BEST_VALUE_DISCOUNT_THRESHOLD = 35;

export type {
	Product,
	Category,
	ProductList,
	ProductListState,
	ProductWithAdditionalData,
};
