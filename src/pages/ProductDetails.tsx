import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart01 } from "@untitledui/icons";
import { useNavigate, useParams } from "react-router";
import { useProducts } from "../context/useProducts";
import Button from "../UI/Button";
import {
	BEST_VALUE_DISCOUNT_THRESHOLD,
	type ProductWithAdditionalData,
} from "../types/productTypes";
import { Container } from "../layout/Container";
import { FetchedProductValidator } from "../validators/ProductValidator";
import { ROUTES } from "../routes/routeStrings";

export function ProductDetails() {
	const [productData, setProductData] =
		useState<ProductWithAdditionalData | null>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const { getProductById } = useProducts();

	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		async function fetchProductData() {
			if (!params.id) {
				navigate(ROUTES.PRODUCT.ROOT);
				return;
			}

			setIsLoading(true);
			const product = await getProductById(parseInt(params.id));
			const parsedData = FetchedProductValidator.safeParse(product);

			if (!product || !parsedData.success) {
				setIsLoading(false);
				navigate(ROUTES.PRODUCT.ROOT);
				return;
			}

			setIsLoading(false);
			setProductData(parsedData.data);
		}
		fetchProductData();
	}, [getProductById, params.id, navigate]);

	if (isLoading || !productData) {
		return (
			<Container type="ROW" className="flex justify-center flex-1 pt-16">
				<div className="w-[70vw] h-[60vh] rounded-4xl bg-accent/10 text-accent flex justify-center items-center">
					<span className="text-xl">Loading product...</span>
				</div>
			</Container>
		);
	}

	return (
		<Container type="ROW" className="flex justify-center flex-1">
			<div className="overflow-y-auto w-[70vw]">
				<Container type="COLUMN" className="max-w-full py-8 gap-4">
					<Button
						variant="GHOST"
						className="self-baseline"
						onClick={() => navigate(ROUTES.PRODUCT.ROOT)}
					>
						<ArrowLeft size={18} className="inline-block" />
						Go back
					</Button>
					<Container type="ROW" className="gap-8">
						<Container type="COLUMN" className="gap-4 flex-2">
							<div className="rounded-3xl overflow-hidden">
								<img
									src={productData.images[selectedImage]}
									alt="Product image"
								/>
							</div>
							<Container type="ROW" className="gap-4 p-2">
								{productData.images.map((imageUrl, index) => {
									return (
										<button
											className={`w-30 rounded-2xl overflow-hidden transition-all duration-300 ${selectedImage === index ? "scale-100 shadow-image-card" : "scale-90"}`}
											onClick={() =>
												setSelectedImage(index)
											}
											key={imageUrl}
										>
											<img
												src={imageUrl}
												alt="Product image"
											/>
										</button>
									);
								})}
							</Container>
						</Container>
						<Container type="COLUMN" className="flex-3 gap-6 px-8">
							<div>
								<span className="inline-block py-2 px-4 rounded-4xl bg-accent/10 text-accent">
									{productData.category.name}
								</span>
								{productData.discount >=
									BEST_VALUE_DISCOUNT_THRESHOLD && (
									<span className="inline-block py-2 px-4 bg-white/40 backdrop-blur-sm rounded-4xl">
										Best value
									</span>
								)}
							</div>
							<div>
								<h1 className="text-4xl">
									{productData.title}
								</h1>
							</div>
							<div className="flex gap-3 justify-start items-center">
								<span className="text-5xl font-extrabold">
									$
									{(
										productData.price -
										(productData.price *
											productData.discount) /
											100
									).toFixed(2)}
								</span>
								<span className="text-xl text-gray-400 line-through">
									${productData.price}
								</span>
								<div className="flex-1 text-right">
									<span className="bg-accent/20 text-accent p-1.5 px-3 text-lg rounded-4xl uppercase">
										{productData.discount}% off
									</span>
								</div>
							</div>
							<div>
								<h1 className="text-gray-600">
									{productData.description}
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
			</div>
		</Container>
	);
}
