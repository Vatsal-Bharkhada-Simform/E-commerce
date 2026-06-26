import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ProductDetails } from "./pages/ProductDetails";
import { Products } from "./pages/Products";
import { RootLayout } from "./layout/RootLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ROUTES } from "./routes/routeStrings";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.AUTH.ROOT} element={<AuthLayout />}>
						<Route path={ROUTES.AUTH.SIGNUP} element={<SignUp />} />
						<Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
					</Route>

					<Route
						path={ROUTES.GLOBAL_ROOT}
						element={<ProtectedRoute />}
					>
						<Route element={<RootLayout />}>
							<Route
								index
								element={
									<Navigate
										to={ROUTES.PRODUCT.ROOT}
										replace
									/>
								}
							/>
							<Route
								path={ROUTES.PRODUCT.ROOT}
								element={<Products />}
							/>
							<Route
								path={ROUTES.PRODUCT.INDIVIDUAL}
								element={<ProductDetails />}
							/>
						</Route>
					</Route>

					<Route
						path={ROUTES.CATCH_ALL}
						element={<Navigate to={ROUTES.AUTH.LOGIN} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
