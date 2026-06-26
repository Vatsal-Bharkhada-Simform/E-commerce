import z from "zod";

const CategoryValidator = z.object({
	id: z.number(),
	name: z.string(),
	image: z.string(),
	slug: z.string(),
});

const ProductValidator = z.object({
	id: z.number(),
	title: z.string(),
	slug: z.string(),
	price: z.number(),
	description: z.string(),
	category: CategoryValidator,
	images: z.array(z.string()),
});

const FetchedProductValidator = z.object({
	id: z.number(),
	title: z.string(),
	slug: z.string(),
	price: z.number(),
	discount: z.number(),
	description: z.string(),
	category: CategoryValidator,
	images: z.array(z.string()),
});

const ProductListValidator = z.array(ProductValidator);

export { ProductValidator, ProductListValidator, FetchedProductValidator };
