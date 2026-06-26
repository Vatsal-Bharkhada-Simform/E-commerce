import { useEffect, useState } from "react";
import { LogOut, ShoppingCart } from "lucide-react";
import { useLocation } from "react-router";
import Button from "../UI/Button";
import { useAuth } from "../context/useAuth";
import { useProductFilters } from "../hooks/useProductFilters";
import { ROUTES } from "../routes/routeStrings";

export function Header({
	searchRef,
}: {
	searchRef: React.RefObject<HTMLInputElement | null>;
}) {
	const [inputValue, setInputValue] = useState("");

	const { setSearchQuery } = useProductFilters();
	const { pathname } = useLocation();
	const { handleLogout } = useAuth();

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchQuery(inputValue);
		}, 300);

		return () => clearTimeout(timer);
	}, [inputValue, setSearchQuery]);

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
				{pathname === ROUTES.PRODUCT.ROOT && (
					<input
						type="search"
						className="w-sm px-4 py-1.5 bg-gray-50 border-2 border-gray-300 focus:border-accent/70 outline-0 focus:outline-3 outline-accent/20 rounded-2xl"
						placeholder="Search items..."
						title="Search items"
						ref={searchRef}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				)}
				<Button variant="PRIMARY" className="flex items-center gap-2">
					<ShoppingCart
						fill="#fff"
						className="inline-block"
						size={18}
					/>
					Cart
				</Button>
				<Button
					variant="DANGER"
					className="flex items-center gap-2"
					onClick={handleLogout}
				>
					<LogOut className="inline-block" size={18} />
					Logout
				</Button>
			</div>
		</header>
	);
}
