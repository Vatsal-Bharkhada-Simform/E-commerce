import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { ProductsContextProvider } from "./context/ProductsContextProvider.tsx";
import { FilterContextProvider } from "./context/FilterContextProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster
			position="top-right"
			reverseOrder={false}
			gutter={8}
			toastOptions={{
				style: {
					padding: "1rem",
					borderRadius: "10rem",
				},
			}}
		/>
		<ProductsContextProvider>
			<FilterContextProvider>
				<App />
			</FilterContextProvider>
		</ProductsContextProvider>
	</StrictMode>
);
