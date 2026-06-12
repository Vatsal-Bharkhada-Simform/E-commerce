import { useRef, useState, type UIEvent } from "react";

export function ImageCarousel({ images }: { images: Array<string> }) {
	const [imageInView, setImageInView] = useState<number>(0);
	const imageRef = useRef<HTMLImageElement>(null);

	function handleScrollIntoView(index: number) {
		if (!imageRef.current) return;
		imageRef.current.children[index].scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
	}

	function handleScroll(e: UIEvent<HTMLDivElement>) {
		const index = Math.round(
			e.currentTarget.scrollLeft / e.currentTarget.clientWidth
		);
		if (index === imageInView) return;
		else {
			setImageInView(index);
		}
	}

	return (
		<div className="relative group inset-shadow-indigo-500/50">
			<div
				className="flex w-full aspect-square overflow-x-scroll snap-x snap-mandatory no-scrollbar"
				ref={imageRef}
				onScrollCapture={handleScroll}
			>
				{images.map((src) => {
					return (
						<img
							src={src}
							alt="Product image"
							key={src}
							className="w-full shrink-0 snap-start"
						/>
					);
				})}
			</div>
			{images.length > 1 && (
				<div className="absolute bottom-3 left-4 z-10 flex p-3 rounded-4xl border border-gray-100/20 bg-gray-700/40 backdrop-blur-xs gap-3 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
					{images.map((_, index) => {
						return (
							<div
								className={`w-3 aspect-square rounded-xl cursor-pointer  ${imageInView === index ? "scale-125 bg-white" : "scale-100 bg-gray-200/70 border-4 border-white/0"}`}
								key={_}
								onClick={() => handleScrollIntoView(index)}
							></div>
						);
					})}
				</div>
			)}
		</div>
	);
}
