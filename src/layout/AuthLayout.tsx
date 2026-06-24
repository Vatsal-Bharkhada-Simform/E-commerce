import { Outlet } from "react-router";

export function AuthLayout() {
	return (
		<div className="w-full h-screen overflow-hidden flex justify-center items-center">
			<Outlet />
		</div>
	);
}
