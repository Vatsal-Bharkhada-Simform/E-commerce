import { ShoppingCart01 } from "@untitledui/icons";

export function Header() {
	return (
		<header className="p-4 border-b border-b-gray-200 flex justify-between items-center">
			<div>
				<input
					type="search"
					className="w-sm px-4 py-2 bg-gray-50 border border-border rounded-2xl"
					placeholder="Search items..."
				/>
			</div>
			<div>
				<button className="px-4 py-3 rounded-2xl text-lg bg-accent hover:bg-accent-hover text-white cursor-pointer flex items-center gap-2">
					<ShoppingCart01
						fill="#fff"
						className="inline-block"
						size={18}
					/>
					Cart
				</button>
			</div>
		</header>
	);
}
