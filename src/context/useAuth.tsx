import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error("Context is not available for this component");
	}

	return authContext;
}
