import { useProducts } from "../context/useProducts";
import { ProductCard } from "../components/ProductCard";
import Button from "../UI/Button";

export function Products() {
	const { products } = useProducts();

	return (
		<section className="flex-1 flex flex-col overflow-hidden bg-card">
			<div className="flex-1 overflow-y-auto p-8">
				<div>
					<div className="p-8 flex flex-col gap-8 bg-white border border-border rounded-4xl">
						<h2 className="text-3xl">
							Explore our vast range of products
						</h2>
						<div className="flex gap-4">
							<Button variant="PRIMARY">View Catalog</Button>
							<Button variant="SECONDARY">
								Explore products
							</Button>
						</div>
					</div>
				</div>
				<div className="pt-8 pb-4 px-2 text-lg text-gray-600">
					{products.length > 0 &&
						`Showing ${products.length} out of ${Math.max(products.length, 200)} products`}
				</div>
				<div className="grid sm:grid-cols-3 md:grid-cols-4 gap-8">
					{products.length === 0 ? (
						<div className="col-span-4 flex p-20 justify-center items-center bg-gray-200 rounded-4xl">
							Loading Products...
						</div>
					) : (
						products.map((product) => {
							return (
								<ProductCard
									product={product}
									key={product.id}
								/>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
}
