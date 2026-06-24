import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";

export function ProtectedRoute() {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated.status) {
		return <Outlet />;
	}

	return <Navigate to={"/auth/login"} replace />;
}
