import { ShoppingCart01 } from "@untitledui/icons";
import Button from "../UI/Button";

export function Header() {
	return (
		<header className="p-4 border-b border-b-gray-200 flex justify-between items-center">
			<div>
				<div>
					<h1 className="text-text-main font-bold text-4xl">
						<a href="/">Ferio</a>
					</h1>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<input
					type="search"
					className="w-sm px-4 py-2 bg-gray-50 border border-border rounded-2xl"
					placeholder="Search items..."
					title="Search items"
				/>
				<Button variant="PRIMARY" className="flex items-center gap-2">
					<ShoppingCart01
						fill="#fff"
						className="inline-block"
						size={18}
					/>
					Cart
				</Button>
			</div>
		</header>
	);
}
