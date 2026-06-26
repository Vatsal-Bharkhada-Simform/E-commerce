import { useLocation } from "react-router";
import { ROUTES } from "../routes/routeStrings";

export function Footer({ focusOnSearch }: { focusOnSearch: () => void }) {
	const { pathname } = useLocation();

	return (
		<footer className="p-2 border-t border-t-gray-200 flex justify-center gap-4 text-sm">
			<span className="text-gray-500">
				&#169; 2026 Ferio, Built by Vatsal Bharkhada
			</span>
			{pathname === ROUTES.PRODUCT.ROOT && (
				<button
					className="hover:underline cursor-pointer"
					onClick={focusOnSearch}
				>
					Focus on search
				</button>
			)}
		</footer>
	);
}
