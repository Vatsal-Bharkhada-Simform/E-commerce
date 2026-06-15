import type { ProductWithAdditionalData } from "../types/productTypes";
import { ImageCarousel } from "./ImageCarousel";
import Button from "../UI/Button";
import { Heart, ShoppingCart01 } from "@untitledui/icons";
import { useState } from "react";

export function ProductCard({
	product,
}: {
	product: ProductWithAdditionalData;
}) {
	const [isWishListed, setIsWishListed] = useState<boolean>(false);

	return (
		<div className="w-full bg-white border border-border shadow-md rounded-4xl flex flex-col gap-2 overflow-hidden">
			<div className="relative overflow-hidden shrink-0 group">
				<button
					className="absolute cursor-pointer top-[4%] right-[4%] z-20 bg-white/40 p-3 rounded-4xl duration-300 backdrop-blur-sm"
					onClick={() => setIsWishListed((prev) => !prev)}
				>
					<Heart
						size={22}
						color={isWishListed ? "#fb2c36" : "#555"}
						className="-mb-0.5"
						fill={isWishListed ? "#fb2c36" : "transparent"}
					/>
				</button>
				{product.discount >= 35 && (
					<span className="absolute top-[4%] left-[4%] z-20 py-2 px-4 bg-white/40 backdrop-blur-sm rounded-4xl uppercase text-xs">
						Best value
					</span>
				)}
				<ImageCarousel images={product.images} />
			</div>
			<div className="flex-1 flex flex-col justify-between gap-5 p-4">
				<div className="flex-1 flex flex-col gap-4 overflow-hidden">
					<div className="flex gap-3 justify-start items-center">
						<span className="text-4xl font-extrabold">
							$
							{(
								product.price -
								(product.price * product.discount) / 100
							).toFixed(2)}
						</span>
						<span className="text-lg text-gray-400 line-through">
							${product.price}
						</span>
						<div className="flex-1 text-right">
							<span className="bg-accent/20 text-accent p-1.5 px-3 text-sm rounded-4xl uppercase">
								{product.discount}% off
							</span>
						</div>
					</div>
					<span
						className="text-lg truncate text-text-main"
						title={product.title}
					>
						{product.title}
					</span>
					<span className="text-sm text-gray-500 line-clamp-2">
						{product.description}
					</span>
				</div>
				<div className="flex gap-4">
					<Button
						variant="PRIMARY"
						className="flex-1"
						key={"button_p" + product.id}
					>
						Buy now
					</Button>
					<Button variant="SECONDARY" key={"button_s" + product.id}>
						<ShoppingCart01 />
					</Button>
				</div>
			</div>
		</div>
	);
}
