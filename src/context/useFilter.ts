import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export function useFilter() {
	const context = useContext(FilterContext);

	if (!context) {
		throw new Error("Filter context cannot be used outside provider");
	}

	return context;
}
