import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ProductDetails } from "./layout/ProductDetails";
import { Products } from "./layout/Products";
import { RootLayout } from "./layout/RootLayout";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
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
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
