import { useMemo, useState, type ReactNode } from "react";
import { FilterContext } from "./FilterContext";

export function FilterContextProvider({ children }: { children: ReactNode }) {
	const [searchQuery, setSearchQuery] = useState("");

	const ctxValue = useMemo(
		() => ({
			searchQuery,
			setSearchQuery,
		}),
		[searchQuery]
	);

	return (
		<FilterContext.Provider value={ctxValue}>
			{children}
		</FilterContext.Provider>
	);
}
