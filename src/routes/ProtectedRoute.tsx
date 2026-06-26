// ==========================================
//           SKIP THIS FILE
// ==========================================

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";
import { ROUTES } from "./routeStrings";

export function ProtectedRoute() {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated.status) {
		return <Outlet />;
	}

	return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
}
