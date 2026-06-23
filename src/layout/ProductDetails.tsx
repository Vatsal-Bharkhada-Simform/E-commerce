import { useState } from "react";
import { ArrowLeft, ShoppingCart01 } from "@untitledui/icons";
import { useProducts } from "../context/useProducts";
import Button from "../UI/Button";
import { Container } from "./Container";
import {
	BEST_VALUE_DISCOUNT_THRESHOLD,
	type ProductWithAdditionalData,
} from "../types/productTypes";

export function ProductDetails({
	selectedProduct,
}: {
	selectedProduct: ProductWithAdditionalData;
}) {
	const [selectedImage, setSelectedImage] = useState(0);

	const { clearSelectedProduct } = useProducts();

	if (!selectedProduct) {
		return <h1>No Product found</h1>;
	}

	return (
		<Container type="COLUMN" className="max-w-full py-8 gap-4">
			<Button
				variant="GHOST"
				className="self-baseline"
				onClick={clearSelectedProduct}
			>
				<ArrowLeft size={18} className="inline-block" />
				Go back
			</Button>
			<Container type="ROW" className="gap-8">
				<Container type="COLUMN" className="gap-4 flex-2">
					<div className="rounded-3xl overflow-hidden">
						<img
							src={selectedProduct.images[selectedImage]}
							alt="Product image"
						/>
					</div>
					<Container type="ROW" className="gap-4 p-2">
						{selectedProduct.images.map((imageUrl, index) => {
							return (
								<button
									className={`w-30 rounded-2xl overflow-hidden transition-all duration-300 ${selectedImage === index ? "scale-100 shadow-image-card" : "scale-90"}`}
									onClick={() => setSelectedImage(index)}
									key={imageUrl}
								>
									<img src={imageUrl} alt="Product image" />
								</button>
							);
						})}
					</Container>
				</Container>
				<Container type="COLUMN" className="flex-3 gap-6 px-8">
					<div>
						<span className="inline-block py-2 px-4 rounded-4xl bg-accent/10 text-accent">
							{selectedProduct.category.name}
						</span>
						{selectedProduct.discount >=
							BEST_VALUE_DISCOUNT_THRESHOLD && (
							<span className="inline-block py-2 px-4 bg-white/40 backdrop-blur-sm rounded-4xl">
								Best value
							</span>
						)}
					</div>
					<div>
						<h1 className="text-4xl">{selectedProduct.title}</h1>
					</div>
					<div className="flex gap-3 justify-start items-center">
						<span className="text-5xl font-extrabold">
							$
							{(
								selectedProduct.price -
								(selectedProduct.price *
									selectedProduct.discount) /
									100
							).toFixed(2)}
						</span>
						<span className="text-xl text-gray-400 line-through">
							${selectedProduct.price}
						</span>
						<div className="flex-1 text-right">
							<span className="bg-accent/20 text-accent p-1.5 px-3 text-lg rounded-4xl uppercase">
								{selectedProduct.discount}% off
							</span>
						</div>
					</div>
					<div>
						<h1 className="text-gray-600">
							{selectedProduct.description}
						</h1>
					</div>
					<div className="flex gap-4">
						<Button
							variant="PRIMARY"
							className="flex-1 text-center"
						>
							Buy now
						</Button>
						<Button variant="SECONDARY" title="Add to cart">
							<ShoppingCart01 />
							Add to cart
						</Button>
					</div>
				</Container>
			</Container>
		</Container>
	);
}
