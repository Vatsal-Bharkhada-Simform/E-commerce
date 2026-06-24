import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ProductDetails } from "./pages/ProductDetails";
import { Products } from "./pages/Products";
import { RootLayout } from "./layout/RootLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={<AuthLayout />}>
						<Route path="/auth/signup" element={<SignUp />} />
						<Route path="/auth/login" element={<Login />} />
					</Route>

					<Route path="/" element={<RootLayout />}>
						<Route
							index
							element={<Navigate to="/products" replace />}
						/>
						<Route path="/products" element={<Products />} />
						<Route
							path="/products/:id"
							element={<ProductDetails />}
						/>
					</Route>

					<Route path="*" element={<Navigate to={"/auth/login"} />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
