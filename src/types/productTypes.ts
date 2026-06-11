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

type ProductList = Array<Product>;

export type { Product, Category, ProductList };
